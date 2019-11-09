const router = require("express").Router();
const { db, Users, HealthStats, Dates } = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//make sure to export the router
module.exports = router;

router.get("/", async (req, res, next) => {
  Users.findAll({ limit: 200 })
    .then(userResponse => {
      res.status(200).json(userResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.post("/create", async (req, res, next) => {
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
