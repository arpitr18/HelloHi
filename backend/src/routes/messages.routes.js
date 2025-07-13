import { Router } from "express";
import { checkAuth } from "../middlewares/auth.middleware.js";
import {
  getAllUsers,
  getMessages,
  sendMessages,
} from "../controllers/messages.controller.js";

const router = Router();

router.route("/users").get(checkAuth, getAllUsers);
router.route("/:id").get(checkAuth, getMessages);
router.route("/send:id").post(checkAuth, sendMessages);

export default router;
