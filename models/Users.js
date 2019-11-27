const db = require("./db");
const Sequelize = require("sequelize");

const Users = db.define(
  "users",
  {
    // userid: {
    //   type: Sequelize.INTEGER,
    //   autoIncrement: true,
    //   primaryKey: true
    // },
    // username: {
    //   type: Sequelize.TEXT,
    //   allowNull: true,
    //   primaryKey: true,
    //   validate: {
    //     notEmpty: true
    //   }
    // },
    password: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: Sequelize.TEXT,
      allowNull: true,
      primaryKey: true,
      validate: {
        notEmpty: true
      }
    }
  },
  {
    tableName: "users",
    timestamps: false
  }
);

module.exports = Users;
