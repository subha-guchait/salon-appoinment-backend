const express = require("express");

const router = express.Router();

const {
  getServices,
  createService,
  updateService,
  deleteService,
} = require("../controllers/service.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/isAdmin.middleware");

router.get("/", getServices);
router.post("/", authenticate, isAdmin, createService);
router.put("/:serviceId", authenticate, isAdmin, updateService);
router.delete("/:serviceId", authenticate, isAdmin, deleteService);

module.exports = router;
