const express = require("express");

const validateuser = require("../middlewares/validateUser.middleware");

const { register } = require("../controllers/auth.controller");

const router = express.Router();

router.post("/register", validateuser, register);

module.exports = router;
