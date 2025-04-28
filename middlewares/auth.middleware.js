const jwt = require("jsonwebtoken");
const { getUserDetails } = require("../services/user.service");
const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");
const asyncHandler = require("../utilities/asyncHandler.utility");

exports.authenticate = asyncHandler(async (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return next(new ErrorHandler("Authorization token missing", 401));
  }
  const user = jwt.verify(token, process.env.JWT_SECRET);

  console.log("user.....", user);

  if (!user) {
    return next(new ErrorHandler("Invalid or expired token", 401));
  }
  const userDetails = await getUserDetails(user.id);

  console.log("user details", userDetails);

  if (!userDetails) {
    return next(new ErrorHandler("User not found", 401));
  }

  req.user = userDetails;
  next();
});
