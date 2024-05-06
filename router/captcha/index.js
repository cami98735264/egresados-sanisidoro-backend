const verifyCaptcha = require("./verifyCaptcha.routes.js");
const express = require("express");
const Router = express.Router();



Router.post("/captcha", verifyCaptcha);


module.exports = Router;