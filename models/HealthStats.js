const db = require("./db");
const Sequelize = require("sequelize");

const HealthStats = db.define("healthstats", {
  userid: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  healthstatid: {
    type: Sequelize.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  water: {
    type: Sequelize.FLOAT
  },
  weight: {
    type: Sequelize.FLOAT
  },
  height: {
    type: Sequelize.FLOAT
  },
  sleep: {
    type: Sequelize.FLOAT
  },
  steps: {
    type: Sequelize.INTEGER
  },
  calories: {
    type: Sequelize.FLOAT
  }
});

module.exports = HealthStats;
