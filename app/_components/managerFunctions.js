export const fetchAllLeaveRequests = async () => {
  try {
    const response = await fetch("http://localhost:5001/leave-requests");
    if (!response.ok) {
      console.error(`HTTP error! status: ${response.status}`);
      const text = await response.text();
      console.error(`Response text: ${text}`);
      throw new Error(`Failed to fetch leave requests: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching all leave requests:", error);
    throw error;
  }
};

export const updateLeaveRequestStatus = async (session, newStatus) => {
  try {
    const response = await fetch(
      `http://localhost:5001/leave-requests/${session.user.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: newStatus }),
      }
    );
    if (!response.ok) {
      throw new Error("Failed to update leave request status");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating leave request status:", error);
    throw error;
  }
};
