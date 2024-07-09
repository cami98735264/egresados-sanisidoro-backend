const express = require("express");
const router = express.Router();
const addEducation = require("./addEducacion.routes.js");
const isAuthenticated = require("../../middlewares/validation/isAuthenticated.js");
const educacion = require("./educacion.routes.js");
const checkAdmin = require("../../middlewares/validation/checkAdmin.js")
const all_users = require("./all_users.routes.js");
const deleteEducation = require("./deleteEducacion.routes.js");

router.post("/addEducacion", isAuthenticated, addEducation);
router.post("/deleteEducacion", isAuthenticated, deleteEducation);
router.get("/educacion", isAuthenticated, educacion);
router.get("/all_users", isAuthenticated, checkAdmin, all_users);



module.exports = router;