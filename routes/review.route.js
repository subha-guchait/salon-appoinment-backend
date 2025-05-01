const express = require("express");

const router = express.Router();

const { authenticate } = require("../middlewares/auth.middleware");
const {
  submitReview,
  reviewsofService,
} = require("../controllers/review.controller");

router.post("/:appoinmentId", authenticate, submitReview);
router.get("/:serviceId", authenticate, reviewsofService);

module.exports = router;
