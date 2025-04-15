const asyncHandler = require("../utilities/asyncHandler.utility");
const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");

const {
  getStaffByEmail,
  createStaff,
  getAllStaff,
} = require("../services/staff.service");

exports.addStaff = asyncHandler(async (req, res, next) => {
  const { name, email, phone, specialization } = req.body;

  const existingStaff = await getStaffByEmail(email);

  if (existingStaff) {
    return next(new ErrorHandler("Staff already exists", 409));
  }

  const newStaff = createStaff({ name, email, phone, specialization });

  res.status(201).json({ sucess: true, newStaff });
});

exports.allStaff = asyncHandler(async (req, res, next) => {
  const staffs = await getAllStaff();

  if (!staffs) {
    return next(new ErrorHandler("No staff found", 404));
  }

  res.status(200).json({ sucess: true, staffs });
});
