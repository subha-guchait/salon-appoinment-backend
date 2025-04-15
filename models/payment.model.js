const sequelize = require("../config/database.config");

const Sequelize = require("sequelize");

const Payment = sequelize.define("payment", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  paymentId: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  paymentsessionid: Sequelize.STRING,
  customername: Sequelize.STRING,
  customerEmail: Sequelize.STRING,
  customerPhone: Sequelize.STRING,
  amount: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  currency: Sequelize.STRING,
  status: {
    type: Sequelize.ENUM("Pending", "Success", "Failed"),
    defaultValue: "Pending",
  },
});
