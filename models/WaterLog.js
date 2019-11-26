const db = require("./db");
const Sequelize = require("sequelize");

const WaterLog = db.define("waterlog", {
  waterLogId: {
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
  createdAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE
  },
  updatedAt: {
    allowNull: false,
    defaultValue: new Date(),
    type: Sequelize.DATE
  },
  userId: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

module.exports = WaterLog;
