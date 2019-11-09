const db = require("./db");
const Sequelize = require("sequelize");

const Users = db.define(
  "users",
  {
    userid: {
      type: Sequelize.TEXT,
      allowNull: true
    },
    username: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    tableName: "users"
  }
);

module.exports = Users;
