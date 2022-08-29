import express from "express";
const router = express.Router();

// Controllers
import { getPhonenumbers, addPhonenumber } from "../controllers/phonenumbers";

// Middleware
import { requireSignin } from "../middlewares";

router.get("/get-phonenumbers/", getPhonenumbers);
router.post("/add-phonenumber/", addPhonenumber);

module.exports = router;
