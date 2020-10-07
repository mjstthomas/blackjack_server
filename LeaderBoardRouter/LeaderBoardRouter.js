const express = require("express");
const xss = require("xss");
const userService = require("../userRouter/user-service");

const LeaderBoardRouter = express.Router();
const jsonParser = express.json();

LeaderBoardRouter.route("/api/LeaderBoard").get((req, res, next) => {
  userService
    .getAllUsers(req.app.get("db"))
    .then((result) => {
      res.json(result);
    })
    .catch(next);
});

module.exports = LeaderBoardRouter;
