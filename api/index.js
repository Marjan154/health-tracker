const router = require("express").Router();
module.exports = router;

router.use("/users", require("./User"));
router.use("/water", require("./WaterLog"));
