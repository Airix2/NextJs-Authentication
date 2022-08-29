const db = require("../models/index.js");
const { Op, fn, col } = require("sequelize");

export const getPhonenumbers = async (req, res) => {
    try {
        let phones = await db.Phonenumbers.findAll({ raw: true });
        console.log(phones);
        res.status(200).json(phones);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
export const addPhonenumber = async (req, res) => {
    console.log(req.body);
    try {
        await db.Phonenumbers.create({
            phonenumber: req.body.phonenumber,
        });
        res.status(200).json({ message: "OK" });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
