const express = require("express");

const validateuser = require("../middlewares/validateUser.middleware");

const { register, login } = require("../controllers/auth.controller");
const { registerAdmin } = require("../controllers/authAdmin.controller");

const router = express.Router();

router.post("/register", validateuser, register);
router.post("/register-admin", validateuser, registerAdmin);
router.post("/login", login);

module.exports = router;
