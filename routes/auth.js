import express from "express";
import {
  register,
  login,
  resetpassword,
  forgotpassword,
} from "../controllers/auth.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/forgotpassword").post(forgotpassword);
router.route("/resetpassword/:resetToken").put(resetpassword);

export default router;
