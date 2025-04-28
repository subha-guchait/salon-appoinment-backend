const express = require("express");

const router = express.Router();

const { authenticate } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
const {
  bookAppoinment,
  cancelAppoinment,
  completeAppoinment,
  getAppoinment,
  getAllSheduledAppoinmentsAdmin,
  getAppoinments,
  assignStaff,
} = require("../controllers/appoinment.controller");

router.post("/", authenticate, bookAppoinment);
router.get("/", authenticate, getAppoinments);
router.get("/admin", authenticate, isAdmin, getAllSheduledAppoinmentsAdmin);
router.get("/:appoinmentId", authenticate, getAppoinment);
router.put("/cancel/:appoinmentId", authenticate, cancelAppoinment);
router.put(
  "/complete/admin/:appoinmentId",
  authenticate,
  isAdmin,
  completeAppoinment
);
router.put("/assign/:appoinmentId", authenticate, isAdmin, assignStaff);

module.exports = router;
