const sequelize = require("../config/database.config");
const Sequelize = require("sequelize");

const Staff = sequelize.define("staff", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  specialization: {
    type: Sequelize.ENUM(
      "Hair Stylist",
      "Makeup Artist",
      "Nail Technician",
      "Facial Expert",
      "Massage Therapist"
    ),
    allowNull: false,
  },
});

module.exports = Staff;
