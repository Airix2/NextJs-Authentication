import express from "express";
import cors from "cors";
import { readdirSync } from "fs";
import mongoose from "mongoose";
import csrf from "csurf";
import cookieParser from "cookie-parser";
const morgan = require("morgan");
require("dotenv").config();

const csrfProtection = csrf({ cookie: true });

// create express app
const app = express();

// apply middlewares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use((req, res, next) => {
    //console.log("This is my Middleware");
    next();
});

// route
readdirSync("./routes").map((r) => {
    app.use("/api", require(`./routes/${r}`));
});

// csrf
//app.use(csrfProtection);

// app.get("/api/csrf-token", (req, res) => {
//     let token = req.csrfToken();
//     console.log("Token: ", token);
//     res.status(200).json({ data: { csrfToken: token } });
// });

// port
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
