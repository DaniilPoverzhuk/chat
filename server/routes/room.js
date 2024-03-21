const { Router } = require("express");
const router = Router();

const validation = require("../validation/room.js");
const controller = require("../controllers/room.js");

router.post("/getAll", validation.getAll(), controller.getAll);

router.post("/create", validation.create(), controller.create);

module.exports = router;
