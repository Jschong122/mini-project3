import { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { redirect } from "next/dist/server/api-utils";
import SortingFunction from "../_components/SortingFunction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function UserLeaveRequest({ leaveRequests, setLeaveRequests }) {
  const [editingRequest, setEditingRequest] = useState(null);

  const deleteRequest = async (requestId) => {
    if (!confirm("Are you sure you want to delete this request?")) {
      return;
    }
    try {
      const response = await fetch(`http://localhost:5001/leave-requests`, {
        method: "DELETE",
      });

      console.log(response, "response after deleting request");

      if (response.ok) {
        setLeaveRequests((prevRequests) =>
          prevRequests.filter((r) => r.id !== requestId)
        );
        toast.success("Request deleted successfully");
      } else {
        throw new Error("Failed to delete request");
      }
    } catch (error) {
      console.error("Error deleting request:", error);
      toast.error("Failed to delete request: " + error.message);
    }
  };

  const editRequest = async (requestId, updatedData) => {
    console.log(updatedData, "updatedData");
    console.log(requestId, "requestId");

    try {
      const response = await fetch(
        `http://localhost:5001/leave-requests/${requestId}`,
        {
          method: "PUT",

          body: JSON.stringify(updatedData),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update request");
      }

      const updatedRequest = await response.json();

      setLeaveRequests((prevRequests) =>
        prevRequests.map((request) =>
          request.id === requestId ? updatedRequest : request
        )
      );

      setEditingRequest(null);
      toast.success("Request updated successfully");
    } catch (error) {
      console.error("Error updating request:", error);
      toast.error("Failed to update request: " + error.message);
    }
  };

  const handleSort = (sortedRequests) => {
    setLeaveRequests(sortedRequests);
  };

  return (
    <div>
      <SortingFunction leaveRequests={leaveRequests} onSort={handleSort} />

      <h1 className="text-2xl font-bold mb-3"> Dashboard </h1>
      <table className=" table-auto border-collapse lg:w-[1000px]">
        <thead>
          <tr className="bg-slate-400 text-black ">
            <th>Submit Date</th>
            <th>Username</th>
            <th>Reason for leaving</th>
            <th>Duration</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          {leaveRequests.map((request) => (
            <tr key={request.id}>
              <td className="border-2 border-grey-[#8c8c8c]">
                {request.submittedDate}
              </td>
              <td className="border-2 border-grey-[#8c8c8c]">
                {request.username}
              </td>
              <td className="border-2 border-grey-[#8c8c8c]">
                {request.reason}
              </td>
              <td className="border-2 border-grey-[#8c8c8c]">{`${request.startDate} - ${request.endDate}`}</td>
              <td className="border-2 border-grey-[#8c8c8c]">
                {request.status === "Approved" ? (
                  <span className="bg-green-300 rounded-xl px-2">Approved</span>
                ) : request.status === "Rejected" ? (
                  <span className="bg-red-300  rounded-xl px-2">Rejected</span>
                ) : (
                  <span className="bg-yellow-300  rounded-xl px-2">
                    {" "}
                    Pending{" "}
                  </span>
                )}
              </td>
              <td className="border-2 border-grey-[#8c8c8c]">
                <Dialog>
                  <DialogTrigger asChild>
                    {/* Edit Button */}

                    {request.status === "Pending" ? (
                      <Button
                        className="bg-[#99bac2] mx-2"
                        variant="outline"
                        onClick={() => setEditingRequest(request)}
                      >
                        Edit
                      </Button>
                    ) : (
                      <span className="text-black m-2">
                        You can't edit or delete this request
                      </span>
                    )}
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

                {/* Delete Button */}
                {request.status === "Pending" ? (
                  <Button
                    variant="destructive"
                    onClick={() => deleteRequest(request.id)}
                  >
                    Delete
                  </Button>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default UserLeaveRequest;
