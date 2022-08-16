import express from "express";
const router = express.Router();

// Controllers
import { sendmessage, getmessages } from "../controllers/chats";

// Middleware
import { requireSignin } from "../middlewares";

router.get("/getmessages", requireSignin, getmessages);
router.post("/sendmessage", requireSignin, sendmessage);

module.exports = router;
