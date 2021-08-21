import User from "../models/User.js";
import ErrorResponse from "../utils/errorResponse.js";

export const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.create({
      username,
      email,
      password,
    });

    sendToken(user, 200, res);
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(
      new ErrorResponse("Please provide an email and password.", 400)
    );
  }

  try {
    const user = await User.findOne({ email }).select("+password");

    if (!user) return next(new ErrorResponse("Invalid credentials.", 401));

    const isMatch = await user.matchPassword(password);
    if (!isMatch) return next(new ErrorResponse("Invalid credentials.", 401));

    sendToken(user, 201, res);
  } catch (error) {
    next(err);
  }
};

export const forgotpassword = (req, res, next) => {
  res.send("Forgot password Route");
};

export const resetpassword = (req, res, next) => {
  res.send("Reset password Route");
};

const sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();
  res.status(statusCode).json({ success: true, token });
};
