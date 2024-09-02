const express = require("express");

const router = express.Router();
const leaveRequestController = require("../controllers/leaveRequestController");

router.post("/create", leaveRequestController.createLeaveRequest);
router.get("/", leaveRequestController.getAllLeaveRequests);
router.get("/:id", leaveRequestController.getLeaveRequestById);
router.put("/:id", leaveRequestController.updateLeaveRequest);

module.exports = router;
