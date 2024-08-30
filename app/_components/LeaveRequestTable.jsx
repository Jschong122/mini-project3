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

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(
          `/api/leave-request?username=${session?.user?.username}`
        );
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Something went wrong");
        }

        const data = await response.json();
        setLeaveRequests(data);
        console.log(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }
    if (session?.user?.username) {
      fetchData();
    }
  }, [session]);

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
          <ManagerRole />
        </div>
      ) : (
        <div>
          <UserLeaveRequest
            leaveRequests={leaveRequests}
            setLeaveRequests={handleUpdateLeaveRequests}
          />
        </div>
      )}
    </div>
  );
}

export default LeaveRequestTable;
