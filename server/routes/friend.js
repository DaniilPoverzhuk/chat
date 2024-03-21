const { Router } = require("express");
const router = Router();

const validation = require("../validation/friend.js");
const controller = require("../controllers/friend.js");

router.post("/getAll", validation.getAll(), controller.getAll);

router.post("/add", validation.add(), controller.add);

router.post(
  "/send-friend-request",
  validation.sendFriendRequest(),
  controller.sendFriendRequest
);

router.post(
  "/get-friend-request",
  validation.getFriendRequest(),
  controller.getFriendRequests
);

module.exports = router;
