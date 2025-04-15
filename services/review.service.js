const Review = require("../models/review.model");

const createReview = async (
  appoinmentId,
  rating,
  comment,
  serviceId,
  userId
) => {
  try {
    return await Review.create({
      rating,
      comment,
      appoinmentId,
      serviceId,
      userId,
    });
  } catch (err) {
    throw new Error("Unable to create review");
  }
};

const getReviewsofService = async (serviceId) => {
  try {
    return await Review.findAll({ where: { serviceId: serviceId } });
  } catch (err) {
    throw new Error("Unable to get reviews of service");
  }
};

module.exports = { createReview, getReviewsofService };
