const User = require("../models/user.model");
const { Op } = require("sequelize");

const userExists = async (email, phone) => {
  try {
    return await User.findOne({
      where: phone ? { [Op.or]: [{ email }, { phone }] } : { email },
    });
  } catch (err) {
    console.log(err.message);
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

const getUserDetails = async (userId) => {
  try {
    return await User.findByPk(userId);
  } catch (err) {
    throw new Error("unable to get UserDetails");
  }
};

const getProfile = async (userId) => {
  try {
    return await User.findByPk(userId, {
      attributes: ["name", "email", "phone"],
    });
  } catch (err) {
    throw new Error("unable to fetch profile");
  }
};

const updateProfile = async (userId, updatedData) => {
  try {
    const [updatedRows] = await User.update(updatedData, {
      where: { id: userId },
    });

    return updatedRows > 0;
  } catch (err) {
    throw new Error("unable to update profile");
  }
};

module.exports = {
  userExists,
  createUser,
  getUserDetails,
  getProfile,
  updateProfile,
};
