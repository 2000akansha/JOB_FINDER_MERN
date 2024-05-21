import express from "express";
import { login, register, logout, getUser2 } from "../controllers/jobseekerController.js"; // Updated import path
import{isAuthenticated} from "../middlewares/auth.js"
const router = express.Router();

router.post("/register2", register);
router.post("/login2", login);
router.get("/logout2", isAuthenticated, logout);
router.get("/getuser2", isAuthenticated, getUser2); // Updated function name

export default router;