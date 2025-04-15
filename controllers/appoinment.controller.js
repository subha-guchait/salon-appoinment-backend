const asyncHandler = require("../utilities/asyncHandler.utility");
const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");

const {
  createNewAppoinment,
  updateAppoinmentStatus,
  getAppoinmentDetails,
  getUserAppoinments,
  getAllSheduledAppoinments,
  assignStaffToAppoinment,
} = require("../services/appoinment.service");
const { getServiceRecord } = require("../services/service.service");

exports.bookAppoinment = asyncHandler(async (req, res, next) => {
  const { date, time, serviceId } = req.body;

  if (!date || !time || !serviceId) {
    return next(new ErrorHandler("Please provide all fields", 400));
  }

  const amount = await getServiceRecord(serviceId).price;

  const appoinmentData = {
    date,
    time,
    amount,
    status: "Scheduled",
    paymentStatus: "Not paid",
    serviceId,
    userId: req.user.id,
  };

  const appoinment = await createNewAppoinment(appoinmentData);

  if (!appoinment) {
    return next(new ErrorHandler("Unable to create new appoinment", 500));
  }

  res.status(201).json({ success: true, appoinment });
});

exports.cancelAppoinment = asyncHandler(async (req, res, next) => {
  const { appoinmentId } = req.params;

  if (appoinmentId) {
    return next(new ErrorHandler("please provide appoinment id", 400));
  }

  await updateAppoinmentStatus(appoinmentId, "Cancelled");

  const appoinment = await getAppoinmentDetails(appoinmentId);

  res.status(200).json({
    sucess: true,
    appoinment,
  });
});

exports.completeAppoinment = asyncHandler(async (req, res, next) => {
  const { appoinmentId } = req.params;

  if (!appoinmentId) {
    return next(new ErrorHandler("Please provide appoinment id", 400));
  }

  await updateAppoinmentStatus(appoinmentId, "Completed");

  const appoinment = await getAppoinmentDetails(appoinmentId);

  res.status(200).json({ sucess: true, appoinment });
});

exports.getAppoinment = asyncHandler(async (req, res, next) => {
  const { appoinmentid } = req.params;

  if (!appoinmentid) {
    return next(new ErrorHandler("Please provide valid appoinment id", 400));
  }

  const appoinment = await getAppoinmentDetails(appoinmentid);

  if (!appoinment) {
    return next(new ErrorHandler("Unable to get appoinment details", 404));
  }

  if (appoinment.userId !== req.user.id && req.user.role !== "admin") {
    return next(
      new ErrorHandler("You are not authorized to view this appoinment", 403)
    );
  }

  res.status(200).json({ success: true, appoinment });
});

exports.getAppoinments = asyncHandler(async (req, res, next) => {
  const appoinments = await getUserAppoinments(req.user.id);

  if (!appoinments) {
    return next(new ErrorHandler("Unable to get appoinments", 404));
  }

  res.status(200).json({ sucess: true, appoinments });
});

exports.getAllSheduledAppoinmentsAdmin = asyncHandler(
  async (req, res, next) => {
    const appoinments = await getAllSheduledAppoinments();
    if (!appoinments) {
      return next(new ErrorHandler("Unable to get appoinments", 404));
    }
    res.status(200).json({ sucess: true, appoinments });
  }
);

exports.assignStaff = asyncHandler(async (req, res, next) => {
  const { appoinmentId } = req.params;
  const { staffId } = req.body;

  if (!appoinmentId || !staffId) {
    return next(
      new ErrorHandler("Please provide appoinment id and staff id", 400)
    );
  }

  await assignStaffToAppoinment(appoinmentId, staffId);

  const appoinment = await getAppoinmentDetails(appoinmentId);

  res.status(200).json({ success: true, appoinment });
});
