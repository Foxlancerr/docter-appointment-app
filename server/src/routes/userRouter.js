import express from "express";
import User from "../model/user.model.js";
import authMiddleware from "../middleware/authMiddleware.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.route("/register").post(async (req, res) => {
  try {
    console.log(req.body);
    const { username, password, email } = req.body;

    if (username.length === 0) {
      res.json({ message: "username is required", success: false });
      return;
    }
    if (email.length === 0) {
      res.json({ message: "email is required", success: false });
      return;
    }
    if (password.length === 0) {
      res.json({ message: "password is required", success: false });
      return;
    }

    const userPresent = await User.findOne({ email: email });
    if (userPresent) {
      res
        .status(404)
        .json({ message: "user is already exist", success: false });
      return;
    }

    const newUser = await User.create({
      username,
      email,
      password,
    });

    res
      .status(200)
      .json({ message: "New user created successfully", success: true });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message, success: false });
  }
});

router.route("/signin").post(async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);

  if (email.length === 0) {
    return res.json({ message: "email is required", success: false });
  }
  if (password.length === 0) {
    return res.json({ message: "password is required", success: false });
  }
  const userValid = await User.findOne({
    email: email,
  });
  try {
    console.log(userValid);
    if (!userValid) {
      return res.status(404).json({
        message: "No User is found with this Email !",
        success: false,
      });
    }

    const passwordAuth = await userValid.isPasswordCorrect(password);
    console.log(passwordAuth);
    if (!passwordAuth) {
      return res
        .status(404)
        .json({ message: "password is incorrect", success: false });
    } else {
      const token = jwt.sign({ id: userValid._id }, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      res
        .status(200)
        .json({ message: "user is successfully Login", token, success: true });
    }
  } catch (err) {
    res.json({ message: err.message, success: false });
  }
});

router.route("/get-user-info-by-id").post(authMiddleware, async (req, res) => {
  // console.log(req?.userId);
  try {
    const userLogin = await User.findOne({ _id: req?.userId });
    if (!userLogin) {
      return res.status(200).json({
        message: "user does not exist !",
        success: false,
      });
    } else {
      return res.status(200).json({
        message: "successfully authenticate it",
        success: true,
        data: {
          username: userLogin.username,
          email: userLogin.email,
        },
      });
    }
  } catch (error) {
    res.status(400).json({ message: err.message, success: false });
  }
});

export default router;
