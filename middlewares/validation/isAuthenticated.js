const dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const isAuthenticated = (req, res, next) => {
    console.log("holaaa")
    const authorization = req.cookies.authorization || req.headers.authorization;
    if(!authorization) {
        return res.status(401).json({
            success: false,
            message: "No autorizado",
            errorType: "UNAUTHORIZED"
        });
    }
    jwt.verify(authorization, JWT_SECRET_KEY, (err, decoded) => {
        if(err) {
            return res.status(401).json({
                success: false,
                message: "No autorizado",
                errorType: "UNAUTHORIZED"
            });
        }
        req.decoded = decoded;
    });
    next();
}

module.exports = isAuthenticated;