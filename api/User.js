const router = require("express").Router();
const { db, Users, HealthStats, Dates } = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

router.get("/", async (req, res, next) => {
  const users = await Users.findAll({ limit: 200 });
  res.send(users);
});

router.post("/createuser", async (req, res, next) => {
  const { username, password, email } = req.body;
  try {
    const created = await User.create({
      username,
      password,
      email
    });
    console.log(`created ${created.username}!`);
    res.status(201).send({
      username,
      password,
      email
    });
  } catch (err) {
    console.error(err);
  }
});
