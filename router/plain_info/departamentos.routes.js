const sequelize = require('../../connection/connectToDB.js');
const { DataTypes } = require('sequelize');
const Departamentos = require('../../models/departamentos.js')(sequelize, DataTypes);

const getDepartamentos = async (req, res) => {
    try {
        const departamentos = await Departamentos.findAll();
        return res.status(200).json({
            success: true,
            departamentos
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


module.exports = getDepartamentos;
