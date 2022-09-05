const db = require("../models/index.js");
const { Op, fn, col } = require("sequelize");

const { Teams } = db;

export const getTeams = async (req, res) => {
    try {
        let teams = await Teams.findAll({
            raw: true,
            order: [["name", "ASC"]],
        });
        //console.log(phones);
        res.status(200).json(teams);
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
export const addTeam = async (req, res) => {
    try {
        let checkUnique = await Teams.findAll({
            where: { name: req.body.team },
        });
        console.log(checkUnique);
        if (checkUnique.length === 0) {
            await Teams.create({
                name: req.body.team,
            });
            return res.status(200).json("OK");
        }
        return res.status(501).json({
            message: "The team already exists in the database",
        });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
export const updateTeam = async (req, res) => {
    console.log(req.params, req.body);
    try {
        let number = await Teams.update(
            {
                name: req.body.name,
                phonenumberId: req.body.phonenumberId,
            },
            {
                where: {
                    id: req.params.id,
                },
                returning: true,
            }
        );
        if (number[0] === 1) {
            return res.status(200).json("Team edited successfully");
        }
        return res.status(400).json({ message: "Team could not be found" });
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    }
};
export const deleteTeam = async (req, res) => {
    console.log(req.body, req.query, req.params);
    try {
        let answer = await Teams.destroy({
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
