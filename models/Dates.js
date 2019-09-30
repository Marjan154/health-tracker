const db = require("./db");
const Sequelize = require("sequelize");


const Dates = db.define("dates", {
    userid: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    healthid: {
        type: Sequelize.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    date: {
        type: Sequelize.DATE
    }
})

module.exports = Dates;