import User from "../models/user";
import { hashPassword, comparePassword } from "../utils/auth";
import jwt from "jsonwebtoken";
import axios from "axios";
import { Client, ApiController } from "@bandwidth/messaging";
import { v4 as uuidv4 } from "uuid";

const db = require("../models/index.js");
const { Op, fn, col } = require("sequelize");

const BW_USERNAME = `${process.env.API_USER}`;
const BW_PASSWORD = `${process.env.API_PASS}`;
const BW_ACCOUNT_ID = `${process.env.API_ACCOUNT_ID}`;
const messageId = "1589228074636lm4k2je7j7jklbn2";

const client = new Client({
    basicAuthUserName: BW_USERNAME,
    basicAuthPassword: BW_PASSWORD,
});
const controller = new ApiController(client);

export const register = async (req, res) => {
    try {
        //console.log(req.body)
        const { name, email, password } = req.body;

        // Validation
        if (!name) return res.status(400).send("Name is required");
        if (!password || password.length < 3) {
            return res
                .status(400)
                .send(
                    "Password is required and should be min 3 characters long"
                );
        }
        let userExist = await User.findOne({ email }).exec();
        if (userExist) return res.status(400).send("Email is taken");

        // Hash Password
        const hashedPassword = await hashPassword(password);

        // Register
        const user = new User({
            name,
            email,
            password: hashedPassword,
        });
        await user.save();
        // console.log('saved user', user);
        return res.json({ ok: true });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try Again");
    }
};

export const jwt_register = async (req, res) => {
    try {
        //console.log(req.body)
        const { firstname, lastname, email, password } = req.body;

        // Validation
        if (!firstname) return res.status(400).send("First Name is required");
        if (!lastname) return res.status(400).send("Last Name is required");
        if (!password || password.length < 3) {
            return res
                .status(400)
                .send(
                    "Password is required and should be min 3 characters long"
                );
        }
        let userExist = await db.Users.findOne({ where: { email } });
        if (userExist) return res.status(400).send("Email is taken");

        // Hash Password
        const hashedPassword = await hashPassword(password);
        console.log(hashedPassword);

        // Register
        const user = await db.Users.create(
            {
                id: uuidv4(),
                firstname,
                lastname,
                fullname: `${firstname} ${lastname}`,
                email,
                password: hashedPassword,
            },
            { returning: true }
        );

        // console.log('saved user', user);
        return res.status(200).json({ user });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try Again");
    }
};

export const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body;

        const user = await User.findOne({ email }).exec();
        if (!user) return res.status(400).send("No use found");

        const match = await comparePassword(password, user.password);

        // Create Signed JWT
        const token = jwt.sign({ _id: user.id }, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        // Return user and token to client, exclude hashed pass
        user.password = undefined;

        // Make HTTP only signed so it's not accesible in client side
        res.cookie("token", token, {
            httpOnly: true,
            // secure: true, // Only works on https
        });

        // Send user as json response
        return res.json(user);
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try Again");
    }
};

export const logout = async (req, res) => {
    try {
        res.clearCookie("token");
        return res.json({ message: "Signout success" });
    } catch (err) {
        console.log(err);
        return res.status(400).send("Error. Try Again");
    }
};

export const currentUser = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("-password")
            .exec();
        console.log("user", user);
        return res.json(user);
    } catch (err) {
        console.log(err);
    }
};

export const sendmessage = async (req, res) => {
    console.log("Requesting sending a message");
    console.log(req.body);
    let auth = new Buffer(
        `${process.env.API_USER}:${process.env.API_PASS}`
    ).toString("base64");
    console.log(auth);
    try {
        axios({
            method: "post",
            url: `${process.env.API_URL}`,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Basic ${auth}`,
            },
            data: {
                text: req.body.text,
                // to: '+19096841019',
                to: "+19096843224",
                from: "+18888850079",
                applicationId: "201789a1-7ed2-425e-bd94-15c7518f045e",
                tag: "test message de Alex",
            },
        })
            .then(function (response) {
                console.log(response);
                return res.json({ msg: "good" });
            })
            .catch(function (error) {
                console.log(error);
                return res.json({ msg: "bad" });
            });
    } catch (error) {
        console.log(error);
    }
};

export const getmessages = async (req, res) => {
    let auth = new Buffer(
        `${process.env.API_USER}:${process.env.API_PASS}`
    ).toString("base64");
    console.log("Requesting messages");
    // try {
    //     const response = await controller.getMessages(BW_ACCOUNT_ID, '+19096843224');
    //     console.log(response.body)
    // } catch (error) {
    //     console.error(error);
    // };
    try {
        axios({
            method: "get",
            url: `${process.env.API_URL}`,
            headers: {
                "Content-Type": "application/json;charset=UTF-8",
                Authorization: `Basic ${auth}`,
            },
            params: {
                sourceTn: "+19096841019",
                // messageId: 'fdc2f0cc-3d59-44c7-88de-3d4f13a75169'
            },
        })
            .then(function (response) {
                console.log(response.data);
                return res.json({ msg: "good" });
            })
            .catch(function (error) {
                console.log(error);
                return res.json({ msg: "bad" });
            });
    } catch (error) {
        console.log(error);
    }
};
