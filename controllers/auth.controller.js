const User = require("../models/user.model");
const asyncHandler = require("../utilities/asyncHandler.utility");
const errorhandler = require("../utilities/ErrorHandler.utilitiy");
const { userExists } = require("../services/user.service");
const { registerUser } = require("../services/auth.service");

exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, phone, password, isAccepted } = req.body;

  const existingUser = await userExists(email, phone);
  if (existingUser) {
    return next(new errorhandler("User already exists", 409));
  }

  const newUser = await registerUser(req.body);

  res.status(201).json({ sucess: true, token });
});
