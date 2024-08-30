// managerFunctions.js

export const fetchAllLeaveRequests = async () => {
  try {
    const response = await fetch("/api/manager");
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

export const updateLeaveRequestStatus = async (requestId, newStatus) => {
  try {
    const response = await fetch(`/api/manager?id=${requestId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status: newStatus }),
    });
    if (!response.ok) {
      throw new Error("Failed to update leave request status");
    }
    return await response.json();
  } catch (error) {
    console.error("Error updating leave request status:", error);
    throw error;
  }
};
