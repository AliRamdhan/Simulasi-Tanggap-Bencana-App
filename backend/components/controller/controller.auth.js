const User = require("../model/model.user");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authRegister = async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  const { username, email, password } = req.body;
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const emailExist = await User.findOne({ email: email });
    if (emailExist) {
      return res
        .status(201)
        .json({ message: "Email was used with another user" });
    }

    const saltPassword = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, saltPassword);

    const user = await new User({
      username: username,
      email: email,
      password: hashPassword,
    }).save();

    return res
      .status(200)
      .json({ message: "Account was registered successfully", User: user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const authLogin = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
      .required()
      .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  });
  const { email, password } = req.body
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "invalid email" });
    }
    const hashPassword = await bcrypt.compare(password, user.password);
    if (!hashPassword) {
      return res.status(400).json({ message: "invalid password" });
    }
    const token = await jwt.sign({ _id: user.id }, "secret_key", {
      expiresIn: "8h",
    });
    // Set the token as a cookie
    res.cookie("secret_key", token, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res
      .status(200)
      .json({ message: "Login is succesfull", token: token, User: user });
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const authLogout = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    req.logout();
    res.clearCookie("secret_key", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const authHome = async (req, res) => {
  try {
    const user = req.user;
    if (user) {
      res.status(200).json({ message: "Home Page", User: user });
    } else {
      res.status(404).send({ error: "No users found" });
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  authRegister,
  authLogin,
  authLogout,
  authHome,
};
