const bcrypt = require("bcrypt");

const asyncHandler = require("../utilities/asyncHandler.utility");
const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");
const { userExists } = require("../services/user.service");
const { registerUser, generateAuthToken } = require("../services/auth.service");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password, isAccepted } = req.body;

  const existingUser = await userExists(email, phone);
  if (existingUser) {
    return next(new ErrorHandler("User already exists", 409));
  }

  const newUser = await registerUser({
    name,
    email,
    phone,
    password,
    isAccepted,
    role: "customer",
  });

  const token = generateAuthToken(newUser);

  res.status(201).json({ sucess: true, token });
});

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Email and Password are required", 400));
  }

  const user = await userExists(email);
  if (!user) {
    return next(new ErrorHandler("User not exists", 404));
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    return next(new ErrorHandler("Invalid Password", 401));
  }

  const token = generateAuthToken(user);

  res.status(200).json({ sucess: true, token });
});
