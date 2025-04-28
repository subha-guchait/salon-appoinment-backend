const asyncHandler = require("../utilities/asyncHandler.utility");
const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");

const {
  getStaffByEmail,
  createStaff,
  getAllStaff,
  deleteStaff,
  getStaffsByService,
} = require("../services/staff.service");

const { getServiceRecord } = require("../services/service.service");

exports.addStaff = asyncHandler(async (req, res, next) => {
  const { name, email, phone, serviceId } = req.body;

  const existingStaff = await getStaffByEmail(email);

  if (existingStaff) {
    return next(new ErrorHandler("Staff already exists", 409));
  }

  const service = getServiceRecord(serviceId);

  if (!service) {
    return next(new ErrorHandler("ServiceId does not exist", 404));
  }

  const newStaff = await createStaff({ name, email, phone, serviceId });

  res.status(201).json({ sucess: true, newStaff });
});

exports.allStaff = asyncHandler(async (req, res, next) => {
  const staffs = await getAllStaff();

  if (!staffs) {
    return next(new ErrorHandler("No staff found", 404));
  }

  res.status(200).json({ sucess: true, staffs });
});

exports.deleteStaff = asyncHandler(async (req, res, next) => {
  const { staffId } = req.params;
  if (!staffId) {
    return next(new ErrorHandler("StaffId required", 400));
  }

  const staff = await deleteStaff(staffId);

  if (!staff) {
    return next(new ErrorHandler("Staff not found", 404));
  }

  res.status(200).json({ sucess: true, message: "staff deleted sucessfully" });
});

exports.StaffsByService = asyncHandler(async (req, res, next) => {
  const { serviceId } = req.params;
  if (!serviceId) {
    return next(new ErrorHandler("ServiceId required", 400));
  }

  const staffs = await getStaffsByService(serviceId);

  if (!staffs) {
    return next(new ErrorHandler("No staff available for this service", 404));
  }

  res.status(200).json({ sucess: true, staffs });
});
