const db = require("./db");
const Sequelize = require("sequelize");

const CalorieLogs = db.define("calorielogs", {
  calorielogid: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  amount: {
    type: Sequelize.DECIMAL,
    allowNull: true,
    validate: {
      notEmpty: true
    }
  },
  // createdat: {
  //   allowNull: false,
  //   defaultValue: new Date(),
  //   type: Sequelize.DATE
  // },
  // updatedat: {
  //   allowNull: false,
  //   defaultValue: new Date(),
  //   type: Sequelize.DATE
  // },
  date:{
    type: Sequelize.DATEONLY,
  },
  createdAt: {
    field: 'createdat',
    type: Sequelize.DATE,
  },
  updatedAt: {
      field: 'updatedat',
      type: Sequelize.DATE,

  },
  email: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = CalorieLogs;
