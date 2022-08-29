import express from "express";
const router = express.Router();

// Controllers
import { getUser, getAllUsers, updateUser } from "../controllers/users";

// Middleware
import { requireSignin } from "../middlewares";

router.get("/get-user/:userId", getUser);
router.get("/get-users/", getAllUsers);
router.put("/edit-user/:userId", updateUser);

module.exports = router;
