const router = require("express").Router();
const { db, Users, WaterLogs, Dates } = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//make sure to export the router
module.exports = router;

router.post("/add", async (req, res, next) => {
  const { userid, amount } = req.body;
  console.log(req.body);

  try {
    const created = await WaterLogs.create({ userid, amount });
    console.log(`created ${created.username}!`);
    res.status(201).send({
      userid,
      amount
    });
  } catch (err) {
    console.error(err);
  }
});
