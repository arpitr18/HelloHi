import { Router } from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
} from "../controllers/auth.controller.js";
import { checkAuth } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/update-profile").patch(checkAuth, updateProfile);
router.route("/check").get(checkAuth, (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    res.status(500).json({
      message: "Error checking authentication",
      error: error.message,
    });
  }
});

export default router;
