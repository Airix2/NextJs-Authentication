import axios from "axios";
const db = require("../models/index.js");
const { Op, fn, col } = require("sequelize");

export const getAllUsers = async (req, res) => {
    let users = await db.Users.findAll({ raw: true });
    res.status(200).json(users);
};
export const getUser = async (req, res) => {
    try {
        let user = await db.Users.findOne({ where: { id: req.query.id } });
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
export const updateUser = async (req, res) => {
    console.log(req.body, req.query, req.params);
    try {
        let user = await db.Users.update(
            {
                ...req.body,
                fullname: req.body.firstname + " " + req.body.lastname,
            },
            {
                where: {
                    id: req.params.userId,
                },
            }
        );
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
