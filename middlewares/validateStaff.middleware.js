const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");

const validateStaff = (req, res, next) => {
  const { name, email, phone, serviceId } = req.body;

  if (!name || !email || !phone || !serviceId) {
    return next(new ErrorHandler("Provide all the necessary fields", 400));
  }

  const nameRegex = /^[A-Za-z\s]{2,}$/;
  if (!nameRegex.test(name)) {
    return next(
      new ErrorHandler(
        "Name must contain only letters and spaces, at least 2 characters",
        400
      )
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new ErrorHandler("Invalid email format", 400));
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    return next(new ErrorHandler("Phone number must be 10 digits", 400));
  }

  if (serviceId.length < 1 || serviceId.length > 3) {
    return next(new ErrorHandler("Invalid serviceId", 400));
  }

  next();
};

module.exports = validateStaff;
