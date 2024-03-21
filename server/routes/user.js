const { Router } = require("express");
const router = Router();

const validation = require("../validation/user.js");
const controller = require("../controllers/user.js");

const authMiddleware = require("../middleware/auth.js");

// router.use(authMiddleware);

router.post("/get", validation.get(), controller.get);

router.get("/get/:id", controller.getById);

router.post(
  "/get-non-friends",
  validation.getNonFriends(),
  controller.getNonFriends
);

module.exports = router;
