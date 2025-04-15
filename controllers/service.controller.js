const asyncHandler = require("../utilities/asyncHandler.utility");
const ErrorHandler = require("../utilities/ErrorHandler.utilitiy");

const {
  getAllServices,
  createNewService,
  updateServiceRecord,
  getServiceRecord,
  deleteServiceRecord,
} = require("../services/service.service");

exports.getServices = asyncHandler(async (req, res, next) => {
  const services = await getAllServices();
  if (!services) {
    return nexr(new ErrorHandler("No services found", 404));
  }
  res.status(200).json({ sucess: true, services });
});

exports.createService = asyncHandler(async (req, res, next) => {
  const { name, description, duration, price } = req.body;

  if (!name || !description || !duration || !price) {
    return next(new ErrorHandler("please Provide all fields", 400));
  }

  const service = await createNewService({
    name,
    description,
    duration,
    price,
  });

  if (!service) {
    return next(new ErrorHandler("Unable to create service", 500));
  }

  res.status(201).json({ sucess: true, service });
});

exports.updateService = asyncHandler(async (req, res, next) => {
  const { serviceId } = req.params;
  console.log("service id", serviceId);
  const { name, description, duration, price } = req.body;

  if (!serviceId) {
    return next(new ErrorHandler("please provide serviceid", 400));
  }

  if (!name && !description && !duration && !price) {
    return next(new ErrorHandler("please Provide atleast one field", 400));
  }

  const updatedService = await updateServiceRecord(serviceId, {
    name,
    description,
    duration,
    price,
  });

  if (!updatedService) {
    return res.status(200).json({ sucess: true, message: "No changes made" });
  }

  const service = await getServiceRecord(serviceId);

  res.status(200).json({ sucess: true, service });
});

exports.deleteService = asyncHandler(async (req, res, next) => {
  const { serviceId } = req.params;
  if (!serviceId) {
    return next(new ErrorHandler("please provide valid service id", 400));
  }

  const deleledService = await deleteServiceRecord(serviceId);

  if (!deleledService) {
    return next(new ErrorHandler("Service not exists or already deleted", 404));
  }

  res
    .status(200)
    .json({ sucess: true, message: "service deleted sucessfully" });
});
