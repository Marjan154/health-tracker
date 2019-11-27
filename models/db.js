const Sequelize = require("sequelize");

module.exports = new Sequelize(
  "healthtracker",
  "healthtracker@dbproject1",
  "Teemoscout1!",
  {
    host: "dbproject1.postgres.database.azure.com",
    dialect: "postgres",
    operatorsAliases: false,
    port: 5432,
    ssl: true,

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
