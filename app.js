require("dotenv").config();
const express = require("express");
const cors = require("cors");

const sequelize = require("./config/database.config");
const { errorMiddleware } = require("./middlewares/error.middleware");

const app = express();

app.use(cors({ origin: process.env.FRONTEND_URL || "*", credentials: true }));
app.use(express.json());

//routes

//middlewares
app.use(errorMiddleware);

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
