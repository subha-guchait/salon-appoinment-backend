const Sequelize = require("sequelize");

const sequelize = require("../config/database.config");

const Review = sequelize.define("review", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: { min: 1, max: 5 },
  },
  comment: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

module.exports = Review;
