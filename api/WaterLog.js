const router = require("express").Router();
const { db, Users, WaterLog, Dates } = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//make sure to export the router
module.exports = router;

router.post("/add", async (req, res, next) => {
  const { userid, waterid, amount } = req.query;

  try {
    const created = await WaterLog.create({ userid, waterid, amount });
    console.log(`created ${created.username}!`);
    res.status(201).send({
      userid,
      waterid,
      amount
    });
  } catch (err) {
    console.error(err);
  }
});
