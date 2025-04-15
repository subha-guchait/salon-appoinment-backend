const Sequelize = require("sequelize");

const sequelize = require("../config/database.config");

const Service = sequelize.define("service", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  availabilityDate: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  availabilityTime: {
    type: Sequelize.TIME,
    allowNull: false,
  },
});

module.exports = Service;
