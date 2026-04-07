import express from "express";
import authMiddleware from "../middlewares/verifyToken.js";
import { googleAuth, getMe, logout } from "../controllers/authController.js";

const router = express.Router();

router.post("/google", googleAuth);
router.get("/me", authMiddleware, getMe);
router.post("/logout", logout);

export default router;
