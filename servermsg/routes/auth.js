import express from "express";
const router = express.Router();

// Controllers
import {
    register,
    jwt_register,
    login,
    logout,
    currentUser,
} from "../controllers/auth";

// Middleware
import { requireSignin } from "../middlewares";

router.post("/register", register);
router.post("/jwt-register", jwt_register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser);

module.exports = router;
