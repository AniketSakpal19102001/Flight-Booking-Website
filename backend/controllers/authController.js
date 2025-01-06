import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import catchAsync from "../utils/catchAsync.js";
import appError from "../utils/appError.js";
import config from "../config/config.js";

export const handleRegister = catchAsync(async (req, res, next) => {
  const { email, password, fName, phone, username } = req.body;

  if (!fName || !email || !password || !phone || !username) {
    return next(new appError("All fields must be filled", 400));
  }

  let user = await User.findOne({ email });
  if (user) {
    return next(
      new appError("User already exists with this email. Try logging in", 409)
    );
  }

  user = await User.findOne({ username });
  if (user) {
    return next(
      new appError("Username already taken. Choose a different one", 409)
    );
  }

  let newUser = new User({
    email,
    password,
    fName,
    phone,
    username,
  });

  const result = await newUser.save();

  console.log(result);

  res.status(201).json({
    status: "success",
    message: "Registration successful.",
    user: {
      id: newUser._id,
      fName: newUser.fName,
      email: newUser.email,
      username: newUser.username,
      phone: newUser.phone,
    },
  });
});

export const handleLogin = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  let user = await User.findOne({ email }).select("+password");
  if (!user) return next(new appError("Invalid email or password", 401));

  const matchPassword = await user.comparePassword(password);
  if (!matchPassword)
    return next(new appError("Invalid email or password", 401));

  const token = jwt.sign(
    { id: user._id, email: user.email, isAdmin: user.isAdmin },
    config.JWT_SECRET
  );

  user.password = undefined;

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });

  res.status(200).json({
    status: "success",
    message: "Login successful.",
    user: {
      id: user._id,
      fName: user.fName,
      email: user.email,
      username: user.username,
      phone: user.phone,
      isAdmin: user.isAdmin,
    },
  });
});

export const handleLogout = (req, res, next) => {
  res.clearCookie("token", { httpOnly: true, secure: true });

  res.status(200).json({
    status: "success",
    message: "Logged out successfully",
  });
};
