const { Router } = require("express");
const router = Router();

const controller = require("../controllers/message.js");
const validation = require("../validation/message.js");

router.post("/getAll", validation.getAll(), controller.getAll);

router.post("/save", validation.save(), controller.save);

module.exports = router;
