const express = require("express");

const router = express.Router();

const { authenticate } = require("../middlewares/auth.middleware");
const {
  createReview,
  getReviewsofService,
} = require("../services/review.service");

router.post("/", authenticate, createReview);
router.get("/:serviceId", authenticate, getReviewsofService);

module.exports = router;
