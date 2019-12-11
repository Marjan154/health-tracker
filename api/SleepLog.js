const router = require("express").Router();
const { db, SleepLogs } = require("../models");

const Sequelize = require("sequelize");
const Op = Sequelize.Op;

//make sure to export the router
module.exports = router;

router.post("/add", async (req, res, next) => {
  const { email, amount, date } = req.body;
  console.log(req.body);

  try {
    const created = await SleepLogs.create({ email, amount, date });
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
  SleepLogs.findAll({
    where: {
      email: req.query.email
    },
    order: [["date", "DESC"]]
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
  SleepLogs.findAll({
    attributes: [
      "date",
      "amount",
      ["sleeplogid", "id"]
    ],
    where: {
      email: req.query.email,
      date: req.query.date
    },
    order: [["date", "DESC"]]
  })
    .then(userResponse => {
      res.status(200).json(userResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.get("/groupbyday/:date?", async (req, res, next) => {
  const { email, date } = req.query;
  const query = req.query.date ? { email, date } : { email };
  SleepLogs.findAll({
    where: query,
    attributes: [
      "date",
      [Sequelize.fn("sum", Sequelize.col("amount")), "total"]
    ],
    order: [["date", "DESC"]],
    group: ["date"]
  })
    .then(userResponse => {
    console.log("Hi" + userResponse)
      res.status(200).json(userResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
});

router.put("/update", async (req, res, next) => {
  const { sleeplogid, amount } = req.body;
  console.log(req.body);
  SleepLogs.findOne({
    where: { sleeplogid }
  })
    .then(log => {
      log
        .updateAttributes({
          amount: parseInt(amount)
        })
        .then(() => {
          console.log("Updated successfully");
        });
    })
    .catch(error => {
      res.send(error);
      console.log(error);
    });
});

router.delete("/delete", async (req, res, next) => {
    SleepLogs.destroy({
    where: {
        sleeplogid: req.query.id
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