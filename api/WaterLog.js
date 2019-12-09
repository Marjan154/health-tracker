const router = require("express").Router();
const { db, Users, WaterLogs, Dates } = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//make sure to export the router
module.exports = router;

router.post("/add", async (req, res, next) => {
  const { email, amount, date} = req.body;
  console.log(req.body);

  try {
    const created = await WaterLogs.create({ email, amount, date});
    console.log(`created ${created.username}!`);
    res.status(201).send({
      email,
      amount,
      date
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
    },
    order: [['date', 'DESC']]
  })
    .then(userResponse => {
      res.status(200).json(userResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.get("/bydate", async (req, res, next) => {
  console.log(req.query.email);
  WaterLogs.findAll({
    where: {
      email: req.query.email,
      date: req.query.date,
    },
    order: [['date', 'DESC']]
  })
    .then(userResponse => {
      res.status(200).json(userResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.get("/groupbyday", async (req, res, next) => {
  console.log(req.query.email);
  WaterLogs.findAll({
    where: {
      email: req.query.email,
    },
    attributes: ['date', [Sequelize.fn('sum', Sequelize.col('amount')), 'total']],
    order: [['date', 'DESC']],
    group: ['date']
  })
    .then(userResponse => {
      res.status(200).json(userResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.delete("/delete", async (req, res, next) => {
  console.log("Deleting " + req.query.waterlogid);
  WaterLogs.destroy({
    where: {
      waterlogid: req.query.waterlogid
    }
  })
    .then(rowDeleted => {
      console.log(rowDeleted);
      if (rowDeleted === 1) {
        console.log("Deleted successfully");
        res.sendStatus(200).send(rowDeleted);
      }
    })
    .catch(error => {
      res.send(error);
      console.log(error);
    });
});
