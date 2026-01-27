import { Router } from "express";
import { registerUser, loginUser, getProfile } from "../controllers/usersControllers.js";
import { authMiddleware } from "../middleware/auth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", authMiddleware, getProfile);

export default router;
