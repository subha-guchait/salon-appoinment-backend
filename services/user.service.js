const User = require("../models/user.model");
const { Op } = require("sequelize");

const asyncHandler = require("../utilities/asyncHandler.utility");

const userExists = async (email, phone) => {
  try {
    return await User.findOne({ where: { [Op.or]: [{ email }, { phone }] } });
  } catch (err) {
    throw new Error("Unable to find User:", err.message);
  }
};

const createUser = async (userData) => {
  try {
    return await User.create(userData);
  } catch (err) {
    throw new Error("Unable to create User:", err.message);
  }
};

module.exports = { userExists, createUser };
