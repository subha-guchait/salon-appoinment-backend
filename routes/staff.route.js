const express = require("express");

const router = express.Router();

const {
  addStaff,
  allStaff,
  deleteStaff,
  StaffsByService,
} = require("../controllers/staff.controller");
const { isAdmin } = require("../middlewares/isAdmin.middleware");
const validateStaff = require("../middlewares/validateStaff.middleware");
const { authenticate } = require("../middlewares/auth.middleware");

router.post("/", authenticate, isAdmin, validateStaff, addStaff);
router.get("/", authenticate, isAdmin, allStaff);
router.delete("/:staffId", authenticate, isAdmin, deleteStaff);
router.get("/service/:serviceId", authenticate, isAdmin, StaffsByService);

module.exports = router;
