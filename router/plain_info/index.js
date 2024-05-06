const express = require("express");
const router = express.Router();
const faq = require("./faq.routes.js");



router.get("/faq", faq);


module.exports = router;