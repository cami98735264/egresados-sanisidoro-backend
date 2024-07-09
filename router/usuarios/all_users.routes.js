const sequelize = require('../../connection/connectToDB.js');
const { DataTypes } = require('sequelize');
const Usuario = require('../../models/usuarios.js')(sequelize, DataTypes);

const all_users = async (req, res) => {
    try {
        const users = await Usuario.findAll({
            attributes: {
                exclude: ['contraseña']
            }
        });
        return res.status(200).json({
            success: true,
            users
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error en el servidor",
            errorType: "SERVER_ERROR"
        });
    }
};

module.exports = all_users;