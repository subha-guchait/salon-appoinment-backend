require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database.config");
const { errorMiddleware } = require("./middlewares/error.middleware");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const serviceRoutes = require("./routes/service.route");
const staffRoutes = require("./routes/staff.route");
const User = require("./models/user.model");
const Staff = require("./models/staff.model");
const Appoinment = require("./models/appoinment.model");
const Payment = require("./models/payment.model");
const Service = require("./models/service.model");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));
app.use(express.json());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/staff", staffRoutes);

//middlewares
app.use(errorMiddleware);

//models
Appoinment.belongsTo(User);
User.hasMany(Appoinment);

Appoinment.belongsTo(Staff);
Staff.hasMany(Appoinment);

Appoinment.belongsTo(Service);
Service.hasMany(Appoinment);

Payment.belongsTo(Appoinment);
Appoinment.hasMany(Payment);

const startServer = async (port) => {
  try {
    await sequelize.sync();
    app.listen(port, () => {
      console.log(`server is running on port ${port}`);
    });
  } catch (err) {
    console.log("failed to stat server", err);
  }
};

startServer(process.env.Port || 3000);
