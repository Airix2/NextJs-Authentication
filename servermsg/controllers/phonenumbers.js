const db = require("../models/index.js");
const { Op, fn, col } = require("sequelize");

const { Phonenumbers } = db;

export const getPhonenumbers = async (req, res) => {
    try {
        let phones = await Phonenumbers.findAll({
            raw: true,
            order: [["id", "ASC"]],
        });
        //console.log(phones);
        res.status(200).json(phones);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
export const addPhonenumber = async (req, res) => {
    try {
        let checkUnique = await Phonenumbers.findAll({
            where: { phonenumber: req.body.phonenumber },
        });
        console.log(checkUnique);
        if (checkUnique.length === 0) {
            await Phonenumbers.create({
                phonenumber: req.body.phonenumber,
            });
            return res.status(200).json("OK");
        }
        return res.status(501).json({
            message: "The phonenumber already exists in the database",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
export const updatePhonenumber = async (req, res) => {
    try {
        let number = await Phonenumbers.update(
            {
                phonenumber: req.body.phonenumber,
            },
            {
                where: {
                    id: req.params.id,
                },
                returning: true,
            }
        );
        if (number[0] === 1) {
            return res.status(200).json("Phone Number Edited Successfully");
        }
        return res.status(400).json({ message: "Number could not be find" });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
export const deletePhonenumber = async (req, res) => {
    console.log(req.body, req.query, req.params);
    try {
        let answer = await Phonenumbers.destroy({
            where: {
                id: req.params.id,
            },
        });
        console.log(answer);
        if (answer === 1) {
            return res.status(200).json("Phone Number Deleted Successfully");
        }
        return res.status(400).json({ message: "Number could not be deleted" });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
