const Appoinment = require("../models/appoinment.model");
const Staff = require("../models/staff.model");
const Service = require("../models/service.model");

const createNewAppoinment = async (appoinmentData) => {
  try {
    return await Appoinment.create(appoinmentData);
  } catch (err) {
    console.log(err);
    throw new Error("Unable to create new appoinment");
  }
};

const getAppoinmentDetails = async (appoinmentId) => {
  try {
    return await Appoinment.findByPk(appoinmentId);
  } catch (error) {
    throw new Error("Unable to get appoinment details");
  }
};
const getAppoinmentDetailsWithService = async (appoinmentId) => {
  try {
    return await Appoinment.findOne({
      where: { id: appoinmentId },
      include: {
        model: Service,
        attributes: ["name", "description", "duration"],
      },
    });
  } catch (error) {
    throw new Error("Unable to get appoinment details");
  }
};

const updateAppoinmentStatus = async (appoinmentId, status) => {
  try {
    const appoinment = await Appoinment.findByPk(appoinmentId);
    if (!appoinment) {
      throw new Error("Appoinment not found");
    }
    appoinment.status = status;
    return await appoinment.save();
  } catch (error) {
    throw new Error("Unable to update appoinment status");
  }
};

const updateAppoinmentPaymentStatus = async (appoinmentId, paymentStatus) => {
  try {
    const appoinment = await Appoinment.findByPk(appoinmentId);
    if (!appoinment) {
      throw new Error("Appoinment not found");
    }
    appoinment.paymentStatus = paymentStatus;

    return await appoinment.save();
  } catch (error) {
    throw new Error("Unable to update appoinment paymentStatus");
  }
};

const getUserAppoinments = async (userId) => {
  try {
    return await Appoinment.findAll({
      where: { userId: userId },
      include: {
        model: Service,
        attributes: ["name", "description", "duration"],
      },
      order: [["createdAt", "DESC"]],
    });
  } catch (err) {
    throw new Error("Unable to get user appoinments");
  }
};

const getAllSheduledAppoinments = async () => {
  try {
    return await Appoinment.findAll({ where: { status: "Scheduled" } });
  } catch (error) {
    throw new Error("Unable to get all scheduled appoinments");
  }
};

const assignStaffToAppoinment = async (appoinmentId, staffId) => {
  try {
    const appoinment = await Appoinment.findByPk(appoinmentId);
    if (!appoinment) {
      throw new Error("Appoinment not found");
    }

    const staff = await Staff.findByPk(staffId);
    if (!staff) {
      throw new Error("Staff not found");
    }

    if (staff.serviceId !== appoinment.serviceId) {
      throw new Error(
        "Staff Secialization does not match withh appoinment service"
      );
    }

    appoinment.staffId = staffId;

    return await appoinment.save();
  } catch (err) {
    throw new Error("Unable to assign staff to appoinment");
  }
};

module.exports = {
  createNewAppoinment,
  getAppoinmentDetails,
  updateAppoinmentStatus,
  getUserAppoinments,
  getAllSheduledAppoinments,
  assignStaffToAppoinment,
  getAppoinmentDetailsWithService,
  updateAppoinmentPaymentStatus,
};
