import express from "express";
const router = express.Router();

// Controllers
import {
    getTeams,
    addTeam,
    updateTeam,
    deleteTeam,
} from "../controllers/Teams";

// Middleware
import { requireSignin } from "../middlewares";

router.get("/get-teams/", getTeams);
router.post("/add-team/", addTeam);
router.put("/update-team/:id", updateTeam);
router.delete("/delete-team/:id", deleteTeam);

module.exports = router;
