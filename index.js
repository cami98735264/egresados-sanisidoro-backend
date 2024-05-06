const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const plain_info_router = require("./router/plain_info/index.js");
const captcha_router = require("./router/captcha/index.js");



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:3001",
    credentials: true
}));
app.use(cookieParser());


app.use("/api/info", plain_info_router);
app.use("/api/verify", captcha_router);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});