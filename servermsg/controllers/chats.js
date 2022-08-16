import Messages from "../models/messages";
import axios from "axios";

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
