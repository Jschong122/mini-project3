const express = require("express");
const router = express.Router();
const leaveRequestController = require("../controllers/leaveRequestController");

router.post("/create", leaveRequestController.createLeaveRequest);
router.get("/", leaveRequestController.getAllLeaveRequests);

module.exports = router;
