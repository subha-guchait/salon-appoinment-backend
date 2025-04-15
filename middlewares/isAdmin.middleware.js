const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");

exports.isAdmin = (req, res, next) => {
  if (!req.user) {
    return next(new ErrorHandler("User not found", 401));
  }

  if (req.user.role != "admin") {
    return next(new ErrorHandler("Only admin can perform this action", 403));
  }
  next();
};
