import express from 'express'
const router = express.Router();

// Controllers
import { register, login, logout, currentUser, sendmessage, getmessages } from '../controllers/auth'

// Middleware
import { requireSignin } from '../middlewares'

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/current-user", requireSignin, currentUser)

router.get("/getmessages", getmessages);
router.post("/sendmessage", sendmessage);

module.exports = router;