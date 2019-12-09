const router = require("express").Router();
const { db, Users, WaterLogs, Dates } = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//make sure to export the router
module.exports = router;

router.post("/add", async (req, res, next) => {
  const { email, amount } = req.body;
  console.log(req.body);

  try {
    const created = await WaterLogs.create({ email, amount });
    console.log(`created ${created.username}!`);
    res.status(201).send({
      email,
      amount
    });
  } catch (err) {
    console.error(err);
  }
});

router.get("/all", async (req, res, next) => {
  console.log(req.query.email);
  WaterLogs.findAll({
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

router.delete("/delete", async (req, res, next) => {
  console.log(req.query.waterlogid);
  WaterLogs.destroy({
    where: {
      waterlogid: req.query.waterlogid
    }
  })
    .then(rowDeleted => {
      if(rowDeleted===1){
        console.log('Deleted successfully')
      }
      // res.status(200).json(userResponse);
    })
    .catch(error => {
      console.log(err); 
    });
});