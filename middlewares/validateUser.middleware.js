const errorHandler = require("../utilities/ErrorHandler.utilitiy");

const validateuser = (req, res, next) => {
  const { name, email, phone, password, isAccepted } = req.body;

  if (!name || !email || !phone || !password || isAccepted !== true) {
    return next(
      new errorHandler("All fields are required and t&c must be accepted", 400)
    );
  }

  if (name.length < 3 || name.length > 50) {
    return next(
      new errorHandler("Name must be between 3 to 50 characters", 400)
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return next(new errorHandler("Invalid email format", 400));
  }

  const phoneRegex = /^[0-9]{10}$/;
  if (!phoneRegex.test(phone)) {
    return next(
      new errorHandler("Phone number must be exactly 10 digits", 400)
    );
  }

  if (password.length < 6) {
    return next(
      new errorHandler("Password must be at least 6 characters long", 400)
    );
  }

  next();
};

module.exports = validateuser;
