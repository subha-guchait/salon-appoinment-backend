const asyncHandler = require("../utilities/asyncHandler.utility");
const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");
const { getAppoinmentDetails } = require("../services/appoinment.service");
const {
  createReview,
  getReviewsofService,
} = require("../services/review.service");

exports.submitReview = asyncHandler(async (req, res, next) => {
  const appoinmentId = req.params;
  if (!appoinmentId) {
    return next(new ErrorHandler("Please provide appoinment id", 400));
  }

  const { rating, comment } = req.body;
  if (!rating || !comment) {
    return next(new ErrorHandler("please provide all fields", 400));
  }

  const appoinment = await getAppoinmentDetails(appoinmentId);

  if (!appoinment) {
    return next(new ErrorHandler("Appoinment not found", 404));
  }

  if (appoinment.status !== "Completed") {
    return next(new ErrorHandler("Appoinment not completed", 400));
  }

  if (appoinment.userId !== req.user.id) {
    return next(new ErrorHandler("Appoinment does not belong to user", 400));
  }

  const review = await createReview(
    appoinmentId,
    rating,
    comment,
    appoinment.serviceId,
    req.user.id
  );

  if (!review) {
    return next(new ErrorHandler("Unable to create review", 500));
  }

  res.status(201).json({ sucess: true, review });
});

exports.reviewsofService = asyncHandler(async (req, res, next) => {
  const { serviceId } = req.params;
  if (!serviceId) {
    return next(new ErrorHandler("Please provide service id", 400));
  }

  const reviews = await getReviewsofService(serviceId);
  if (!reviews) {
    return next(new ErrorHandler("Unable to get reviews", 500));
  }
});
