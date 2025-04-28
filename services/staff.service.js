const Staff = require("../models/staff.model");
const Service = require("../models/service.model");

const getStaffByEmail = async (email) => {
  try {
    return await Staff.findOne({ where: { email: email } });
  } catch (err) {
    console.log(err.message);
    throw new Error("Unable to find staff");
  }
};

const createStaff = async (staffData) => {
  try {
    return await Staff.create(staffData);
  } catch (err) {
    console.log(err);
    throw new Error("Staff create failed");
  }
};

const getAllStaff = async () => {
  try {
    return await Staff.findAll({
      attributes: ["id", "name", "email", "phone"],
      include: {
        model: Service,
        attributes: ["name"],
      },
    });
  } catch (err) {
    throw new Error("getting all Staff failed");
  }
};

const deleteStaff = async (staffId) => {
  try {
    const staff = await Staff.findByPk(staffId);
    if (!staff) {
      throw new Error("Staff not found");
    }

    return await staff.destroy();
  } catch (error) {
    throw new Error("Unable to delete staff");
  }
};

const getStaffsByService = async (serviceId) => {
  try {
    return await Staff.findAll({ where: { serviceId: serviceId } });
  } catch (err) {
    console.log(err.message);
    throw new Error("Unable to find staff by serviceId");
  }
};

module.exports = {
  getStaffByEmail,
  createStaff,
  getAllStaff,
  deleteStaff,
  getStaffsByService,
};
