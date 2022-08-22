// const dbConfig = require("../config/db.config.js");
import dbConfig from "../config/db.config.js";
import Sequelize from "sequelize";
// const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: 0,

    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },

    logging: false,
});

const db = {};

/* -------------------------------------------------------------------------- */
/*                  Add Database To SYNC with MYSQL Database                  */
/* -------------------------------------------------------------------------- */

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Users = require("./users")(sequelize, Sequelize);

module.exports = db;
