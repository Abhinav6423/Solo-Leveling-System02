import express from "express"
import { registerUser, loginUser , logoutUser } from "../controllers/authentication.controller.js"
import verifyToken from "../middlewares/verifytoken.middleware.js"
import { validateUser } from "../middlewares/express-validator.middleware.js";
import { getMe } from "../controllers/auth.me.conroller.js";
const router = express.Router();


router.post("/register", validateUser, registerUser)
router.post("/login", validateUser, loginUser)
router.get("/logout", verifyToken, logoutUser)


// PROTECTED (Frontend uses this to check if user is logged in)
router.get("/me", verifyToken, getMe);







export default router;