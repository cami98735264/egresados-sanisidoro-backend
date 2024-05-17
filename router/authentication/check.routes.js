const dotenv = require("dotenv");
dotenv.config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const { DataTypes } = require("sequelize");
const sequelize = require("../../connection/connectToDB.js");
const Usuarios = require("../../models/usuarios.js")(sequelize, DataTypes);
const jwt = require("jsonwebtoken");

const check = async (req, res) => {
    const authorization = req.cookies.authorization || req.headers.authorization;
    if(!authorization) {
        return res.status(401).json({
            success: false,
            message: "No autorizado",
            errorType: "UNAUTHORIZED"
        });
    }
    try {
        jwt.verify(authorization, JWT_SECRET_KEY, async (err, decoded) => {
            if(err) {
                return res.status(401).json({
                    success: false,
                    message: "No autorizado",
                    errorType: "UNAUTHORIZED"
                });
            }
            const user = await Usuarios.findOne({
                where: {
                    documento: decoded.documento
                }
            });
            if(user) {
                return res.status(200).json({
                    success: true,
                    message: "Usuario autenticado",
                    data: decoded
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "No autorizado",
                    errorType: "UNAUTHORIZED"
                });
            }
        });
    } catch(err) {
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error en el servidor",
            errorType: "SERVER_ERROR"
        });
    }

}

module.exports = check;