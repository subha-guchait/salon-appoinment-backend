const Sequelize = require("sequelize");

const sequelize = require("../config/database.config");

const User = sequelize.define("user", {
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
    unique: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isAccepted: {
    type: Sequelize.BOOLEAN,
    allowNull: false,
  },
  role: {
    type: Sequelize.ENUM("customer", "admin"),
    allowNull: false,
    defaultValue: "customer",
  },
  tokenVersion: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: true,
  },
});

module.exports = User;
