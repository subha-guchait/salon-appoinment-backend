const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createUser = require("../services/user.service");

const registerUser = async ({ name, email, phone, password, isAccepted }) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return await createUser({
      name,
      email,
      phone,
      password: hashedPassword,
      isAccepted,
    });
  } catch (err) {
    throw new Error("User registration failed:", err.message);
  }
};

const generateAuthToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      tokenVersion: user.tokenVersion,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = { registerUser, generateAuthToken };
