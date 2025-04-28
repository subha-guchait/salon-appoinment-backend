const sequelize = require("../config/database.config");

const Sequelize = require("sequelize");

const Appoinment = sequelize.define("appoinment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  time: {
    type: Sequelize.TIME,
    allowNull: false,
  },
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("Scheduled", "Completed", "Cancelled"),
    defaultValue: "Scheduled",
  },

  paymentStatus: {
    type: Sequelize.ENUM("Paid", "Not paid"),
    defaultValue: "Not paid",
  },
});

module.exports = Appoinment;
