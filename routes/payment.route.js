const express = require("express");
const router = express.Router();

const { authenticate } = require("../middlewares/auth.middleware");
const {
  processPayment,
  updatepaymentStatus,
} = require("../controllers/payment.controller");

router.post("/appoinment-payment", authenticate, processPayment);
router.get("/verify/:paymentId", updatepaymentStatus);

module.exports = router;
