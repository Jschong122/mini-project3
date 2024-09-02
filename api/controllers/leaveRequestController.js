const { LeaveRequests } = require("../models/leaveRequestModel");

async function createLeaveRequest(req, res) {
  try {
    const leaveRequest = await LeaveRequests.create(req.body);
    res.status(200).json(leaveRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function updateLeaveRequest(req, res) {
  try {
    const { id } = req.params;
    const { startDate, endDate, reason } = req.body;

    const [updatedRowsCount] = await LeaveRequests.update(
      { startDate, endDate, reason },
      {
        where: { id: id },
      }
    );

    if (updatedRowsCount > 0) {
      const updatedLeaveRequest = await LeaveRequests.findByPk(id);
      return res.status(200).json({
        message: "Leave request updated successfully",
        data: updatedLeaveRequest,
      });
    }

    return res.status(404).json({
      message: "Leave request not found",
    });
  } catch (error) {
    console.error("Error updating leave request:", error);
    res.status(500).json({
      message: "Error updating leave request",
      error: error.message,
    });
  }
}

async function getLeaveRequestById(req, res) {
  try {
    const { id } = req.params;
    console.log(id, "id");
    const leaveRequest = await LeaveRequests.findAll({
      where: { user_id: id },
    });
    if (leaveRequest) {
      res.status(200).json(leaveRequest);
    } else {
      res.status(404).json({ message: "no leave request found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function getAllLeaveRequests(req, res) {
  try {
    const leaveRequests = await LeaveRequests.findAll();
    res.status(200).json(leaveRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createLeaveRequest,
  getAllLeaveRequests,
  updateLeaveRequest,
  getLeaveRequestById,
};
