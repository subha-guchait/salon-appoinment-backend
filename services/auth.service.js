const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { createUser } = require("./user.service");

const registerUser = async ({
  name,
  email,
  phone,
  password,
  isAccepted,
  role,
}) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    return await createUser({
      name,
      email,
      phone,
      password: hashedPassword,
      isAccepted,
      role,
    });
  } catch (err) {
    console.log(err.message);
    throw new Error("User registration failed");
  }
};

const generateAuthToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      tokenVersion: user.tokenVersion,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

module.exports = { registerUser, generateAuthToken };
