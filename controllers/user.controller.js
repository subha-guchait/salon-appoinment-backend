const asyncHandler = require("../utilities/asyncHandler.utility");
const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");
const { getProfile, updateProfile } = require("../services/user.service");

exports.getProfile = asyncHandler(async (req, res, next) => {
  res.status(200).json({
    sucess: true,
    data: {
      name: req.user.name,
      email: req.user.email,
      phone: req.user.phone,
    },
  });
});

exports.updateProfile = asyncHandler(async (req, res, next) => {
  const { name, phone } = req.body;
  if (!name && !phone) {
    return next(new ErrorHandler("provide atleast one field to update", 400));
  }

  if (name == req.user.name && phone == req.user.phone) {
    return res.status(200).json({ sucess: true, message: "No changes made" });
  }

  const isUpdated = await updateProfile(req.user.id, { name, phone });

  if (isUpdated == 0) {
    return res.status(200).json({ sucess: true, message: "No changes made" });
  }

  const profile = await getProfile(req.user.id);

  res.status(200).json({ sucess: true, profile });
});
