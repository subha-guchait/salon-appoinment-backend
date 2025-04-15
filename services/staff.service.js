const Staff = require("../models/staff.model");

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
      attributes: ["id", "name", "email", "phone", "specialization"],
    });
  } catch (err) {
    throw new Error("getting all Staff failed");
  }
};

module.exports = { getStaffByEmail, createStaff, getAllStaff };
