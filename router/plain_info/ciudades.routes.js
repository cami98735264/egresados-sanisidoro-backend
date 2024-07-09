const sequelize = require('../../connection/connectToDB.js');
const { DataTypes } = require('sequelize');
const Ciudades = require('../../models/ciudades.js')(sequelize, DataTypes);

const getCiudades = async (req, res) => {
    if(!req.query.departamento_id) {
        return res.status(400).json({
            success: false,
            message: "Faltan campos por llenar",
            errorType: "DATA_MISSING"
        });
    }
    try {
        const ciudades = await Ciudades.findAll({
            where: {
                departamento_id: req.query.departamento_id
            }
        });
        return res.status(200).json({
            success: true,
            ciudades
        });
    } catch(err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error en el servidor",
            errorType: "SERVER_ERROR"
        });
    }
}

module.exports = getCiudades;