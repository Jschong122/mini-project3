// ManagerRole.jsx
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  fetchAllLeaveRequests,
  updateLeaveRequestStatus,
} from "../_components/managerFunctions";
import SortingFunction from "../_components/SortingFunction";
import { Dropdown, IconDropdown } from "react-day-picker";
import { toast } from "react-toastify";

const ManagerRole = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [editingRequest, setEditingRequest] = useState(null);
  const [approve, setApprove] = useState("");
  const [reject, setReject] = useState("");

  const editRequest = async (requestId, updatedData) => {
    console.log("Sending edit request for ID:", requestId);

    try {
      const response = await fetch(`/api/leave-request?id=${requestId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedData),
      });
      console.log("response", response.data);

      if (response.ok) {
        const updatedRequest = await response.json();

        setLeaveRequests((prevRequests) =>
          prevRequests.map((request) =>
            request.id === requestId ? updatedRequest : request
          )
        );

        setEditingRequest(null);
        toast.success("Request updated successfully");
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update request");
      }
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("Error updating request: " + error.message);
    }
  };

  const approveButton = () => {
    setApprove("Approve");
  };
  const rejectButton = () => {
    setReject("Reject");
  };

  const handleSort = (sortedRequests) => {
    setLeaveRequests(sortedRequests);
  };

  useEffect(() => {
    fetchAllLeaveRequests()
      .then((data) => {
        console.log("Fetched leave requests:", data);
        setLeaveRequests(data);
      })
      .catch((error) => console.error("Error fetching leave requests:", error));
  }, []);

  const handleStatusUpdate = async (requestId, newStatus) => {
    try {
      await updateLeaveRequestStatus(requestId, newStatus);

      const updatedRequests = await fetchAllLeaveRequests();
      setLeaveRequests(updatedRequests);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="w-[1000px]">
      <div>
        <h2 className="text-2xl font-bold mb-3">Manager Dashboard</h2>
        <SortingFunction leaveRequests={leaveRequests} onSort={handleSort} />
      </div>

      <div>
        <div>
          {" "}
          <table className=" table-auto border-collapse lg:w-min-[1020px] md:w-auto ">
            <thead className="">
              <tr className="bg-slate-300 text-black">
                <th className="border-2 border-grey-[#8c8c8c]">
                  Submitted Date
                </th>
                <th className="border-2 border-grey-[#8c8c8c]">Username</th>
                <th className="border-2 border-grey-[#8c8c8c]">
                  Reason for leaving
                </th>
                <th className="border-2 border-grey-[#8c8c8c]">Duration</th>
                <th className="border-2 border-grey-[#8c8c8c]">Status</th>
                <th className="border-2 border-grey-[#8c8c8c]">Action</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {leaveRequests.map((request) => (
                <tr key={request.id}>
                  <td className="border-2 border-grey-[#8c8c8c]">
                    {request.submittedDate}
                  </td>
                  <td className="border-2 border-grey-[#8c8c8c] px-7">
                    {request.username}
                  </td>
                  <td className="border-2 border-grey-[#8c8c8c]">
                    {request.reason}
                  </td>
                  <td className="border-2 border-grey-[#8c8c8c] px-3">{`${request.startDate} - ${request.endDate}`}</td>
                  <td className="border-2 border-grey-[#8c8c8c] px-3">
                    {request.status === "Approved" ? (
                      <span className="bg-green-300 rounded-xl px-2">
                        Approved
                      </span>
                    ) : request.status === "Rejected" ? (
                      <span className="bg-red-300  rounded-xl px-2">
                        Rejected
                      </span>
                    ) : (
                      <span className="bg-yellow-300  rounded-xl px-2">
                        {" "}
                        Pending{" "}
                      </span>
                    )}
                  </td>
                  <td className="border-2 border-grey-[#8c8c8c]  md:flex justify-center   items-center ">
                    <Dialog>
                      <DialogTrigger asChild>
                        {/* Edit Button */}
                        <Button
                          className="bg-[#99bac2] mx-2"
                          variant="outline"
                          onClick={() => setEditingRequest(request)}
                        >
                          Edit
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px] border-none bg-slate-300">
                        <DialogHeader>
                          <DialogTitle className="text-grey">
                            Edit Leave Request
                          </DialogTitle>
                        </DialogHeader>
                        <form
                          className="flex flex-col gap-4 py-4 rounded-lg  "
                          onSubmit={(e) => {
                            e.preventDefault();
                            const formData = new FormData(e.target);
                            const updatedData = {
                              startDate: formData.get("startDate"),
                              endDate: formData.get("endDate"),
                              reason: formData.get("reason"),
                            };
                            editRequest(editingRequest.id, updatedData);
                          }}
                        >
                          <input
                            className="rounded bg-[#99bac2] border-2 border-slate-800"
                            type="date"
                            name="startDate"
                            defaultValue={editingRequest?.startDate}
                            required
                          />
                          <input
                            className="rounded bg-[#99bac2] border-2 border-slate-800"
                            type="date"
                            name="endDate"
                            defaultValue={editingRequest?.endDate}
                            required
                          />
                          <input
                            className="rounded bg-[#99bac2] border-2 border-slate-800"
                            type="text"
                            name="reason"
                            defaultValue={editingRequest?.reason}
                            required
                          />
                          <Button
                            className="bg-teal-700 hover:bg-teal-500"
                            type="submit"
                          >
                            Save Changes
                          </Button>
                        </form>
                      </DialogContent>
                    </Dialog>
                    <Button
                      className="  bg-blue-500 text-white m-2 active:bg-blue-200 hover:bg-blue-800 "
                      onClick={() => handleStatusUpdate(request.id, "Approved")}
                    >
                      Approve
                    </Button>
                    <Button
                      className="  bg-red-600 text-white m-2 active:bg-red-600 hover:bg-red-800"
                      onClick={() => handleStatusUpdate(request.id, "Rejected")}
                    >
                      Reject
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManagerRole;
