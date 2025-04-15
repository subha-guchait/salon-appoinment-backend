const { userExists } = require("../services/user.service");
const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");
const asyncHandler = require("../utilities/asyncHandler.utility");
const { registerUser, generateAuthToken } = require("../services/auth.service");

exports.registerAdmin = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password, isAccepted, accessCode } = req.body;

  if (!accessCode) {
    return next(new ErrorHandler("Acess code required", 400));
  }

  if (accessCode != process.env.ADMIN_SIGNUP_CODE) {
    return next(new ErrorHandler("Access code Invalid", 403));
  }

  const existingUser = await userExists(email, phone);
  if (existingUser) {
    return next(new ErrorHandler("User already exists", 409));
  }

  const newAdmin = await registerUser({
    name,
    email,
    phone,
    password,
    isAccepted,
    role: "admin",
  });

  const token = generateAuthToken(newAdmin);

  res.status(201).json({ sucess: true, token });
});
