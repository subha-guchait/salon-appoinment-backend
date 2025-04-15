const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");

const validateStaff = (req, res, next) => {
  const { name, email, phone, specialization } = req.body;

  if (!name || !email || !phone || !specialization) {
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

  const allowedSpecializations = [
    "Hair Stylist",
    "Makeup Artist",
    "Nail Technician",
    "Facial Expert",
    "Massage Therapist",
  ];
  if (!allowedSpecializations.includes(specialization)) {
    return next(new ErrorHandler("Invalid specialization", 400));
  }

  next();
};

module.exports = validateStaff;
