const express = require("express");
const Router = express.Router();
const login = require("./login.routes.js");
const register = require("./register.routes.js");
const check = require("./check.routes.js");
const logout = require("./logout.routes.js");
const verifyCaptcha = require("../../middlewares/captcha/verifyCaptcha.js");
const findUser = require("../../middlewares/validation/findUser.js");

Router.post("/login", verifyCaptcha, findUser, login);
Router.post("/register", verifyCaptcha, findUser, register);
Router.post("/logout", logout);
Router.get("/check", check);

module.exports = Router;