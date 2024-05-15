const express = require("express");
const router = express.Router();
const controller = require("../controller/index");

router.get("/", controller.showIndex);

module.exports = router;