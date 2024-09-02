import React from "react";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import UserLeaveRequest from "../_components/UserLeaveRequest";
import ManagerRole from "../_components/ManagerRole";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function LeaveRequestTable() {
  const { data: session } = useSession();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  console.log("session in LeaveRequestTable:", session);

  useEffect(() => {
    fetchData();
  }, [session]);

  async function fetchData() {
    if (!session?.user?.role) return;

    try {
      let url;
      if (session.user.role === "Manager") {
        url = `http://localhost:5001/leave-requests`;
      } else {
        url = `http://localhost:5001/leave-requests/${session.user.id}`;
      }

      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "error when fetching data");
      }

      const data = await response.json();
      setLeaveRequests(data);
      console.log(data, "after fetch data");
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  const handleUpdateLeaveRequests = (updatedRequests) => {
    console.log("updatedRequests:", updatedRequests);
    setLeaveRequests(updatedRequests);
  };

  console.log("leaveRequests after updated requests:", leaveRequests);

  if (isLoading)
    return (
      <div className=" flex text-7xl w-full h-full justify-center items-center">
        <h1> Loading... </h1>
      </div>
    );
  if (error) return <div> Error: {error} </div>;

  return (
    <div className=" m-5 mt-[100px]">
      {/* Only when role is manager */}

      {session?.user?.role === "Manager" ? (
        <div>
          <ManagerRole session={session} />
        </div>
      ) : (
        <div>
          <UserLeaveRequest
            session={session}
            leaveRequests={leaveRequests}
            setLeaveRequests={handleUpdateLeaveRequests}
          />
        </div>
      )}
    </div>
  );
}

export default LeaveRequestTable;
