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

router.get("/login", async (req, res, next) => {
  Users.findOne({
    where: {
      email: req.query.email
    }
  })
    .then(userResponse => {
      res.status(200).json(userResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.post("/create", async (req, res, next) => {
  const { password, email } = req.body;
  console.log(req.body);
  try {
    const created = await Users.create({
      password,
      email
    });
    console.log(`created ${created.email}!`);
    res.status(201).send({
      password,
      email
    });
  } catch (err) {
    console.error(err);
  }
});
