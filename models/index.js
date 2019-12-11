const db = require("./db");
const Users = require("./Users");
const HealthStats = require("./HealthStats");
const Dates = require("./Dates");
const WaterLogs = require("./WaterLog");
const CalorieLogs = require("./CalorieLog");

module.exports = {
  db,
  Users,
  HealthStats,
  Dates,
  WaterLogs,
  CalorieLogs
};
