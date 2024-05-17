
const sequelize = require('../../connection/connectToDB.js');
const { DataTypes } = require('sequelize');
const Usuario = require('../../models/usuarios.js')(sequelize, DataTypes);


const findUser = async (req, res, next) => {
    let user = null;
    if(!req.body.documento) {
        return res.status(400).json({
            success: false,
            message: "Faltan campos por llenar",
            errorType: "DATA_MISSING"
        });
    }
    try {
        const user = await Usuario.findOne({
            where: {
                documento: req.body.documento
            }
        });
        if(user) {
            req.foundUser = user;
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({
            success: false,
            message: "Ha ocurrido un error en el servidor",
            errorType: "SERVER_ERROR"
        });
    }
    next();

}



module.exports = findUser;