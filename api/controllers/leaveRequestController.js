const { LeaveRequest } = require("../models/leaveRequestModel");

async function createLeaveRequest(req, res) {
  try {
    const leaveRequest = await LeaveRequest.create(req.body);
    res.status(200).json(leaveRequest);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

async function getAllLeaveRequests(req, res) {
  try {
    const leaveRequests = await LeaveRequest.findAll();
    res.status(200).json(leaveRequests);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createLeaveRequest, getAllLeaveRequests };
