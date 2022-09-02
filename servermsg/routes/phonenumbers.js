import express from "express";
const router = express.Router();

// Controllers
import {
    getPhonenumbers,
    addPhonenumber,
    updatePhonenumber,
    deletePhonenumber,
} from "../controllers/phonenumbers";

// Middleware
import { requireSignin } from "../middlewares";

router.get("/get-phonenumbers/", getPhonenumbers);
router.post("/add-phonenumber/", addPhonenumber);
router.put("/update-phonenumber/:id", updatePhonenumber);
router.delete("/delete-phonenumber/:id", deletePhonenumber);

module.exports = router;
