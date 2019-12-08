const Sequelize = require("sequelize");

module.exports = new Sequelize(
  "healthtracker",
  // process.env.PGUSER,
  // process.env.PGPASSWORD,
  "healthtracker@dbproject1",
  "Teemoscout1!",
  {
    host: "dbproject1.postgres.database.azure.com",
    // host: "localhost",
    dialect: "postgres",
    operatorsAliases: false,
    port: 5432,
    ssl: true,
    timezone: "-04:00",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);
