const express = require("express");
const router = express.Router();
const faq = require("./faq.routes.js");
const ciudades = require("./ciudades.routes.js");
const departamentos = require("./departamentos.routes.js");


router.get("/faq", faq);
router.get("/ciudades", ciudades);
router.get("/departamentos", departamentos);

module.exports = router;