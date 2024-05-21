// employerRoutes.js
import express from "express";
import { login, register, logout, getUser1 } from "../controllers/employerController.js";
import { isAuthenticated } from "../middlewares/auth.js"; // Import the isAuthenticated middleware

const router = express.Router();

router.post("/register1", register);
router.post("/login1", login);
router.get("/logout1", isAuthenticated, logout); // Use the isAuthenticated middleware here
router.get("/getuser1", isAuthenticated, getUser1);

export default router;
