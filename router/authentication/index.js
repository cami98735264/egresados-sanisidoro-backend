const express = require("express");
const Router = express.Router();
const login = require("./login.routes.js");
const register = require("./register.routes.js");
const verifyCaptcha = require("../../middlewares/captcha/verifyCaptcha.js");


Router.post("/login", verifyCaptcha, login);
Router.post("/register", verifyCaptcha, register);



module.exports = Router;