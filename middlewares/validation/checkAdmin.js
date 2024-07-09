const sequelize = require('../../connection/connectToDB.js');
const { DataTypes } = require('sequelize');
const Usuario = require('../../models/usuarios.js')(sequelize, DataTypes);


const checkAdmin = async (req, res, next) => {
    if(!req.decoded) {
        return res.status(401).json({
            success: false,
            message: "No tienes permisos para realizar esta acción",
            errorType: "UNAUTHORIZED"
        });
    }
    const user = await Usuario.findOne({
        where: {
            id_usuario: req.decoded.id_usuario
        }
    });
    if(!user.isAdmin) {
        return res.status(401).json({
            success: false,
            message: "No tienes permisos para realizar esta acción",
            errorType: "UNAUTHORIZED"
        });
    }
    next();
}

module.exports = checkAdmin;