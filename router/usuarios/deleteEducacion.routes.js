const sequelize = require('../../connection/connectToDB.js');
const { DataTypes } = require('sequelize');
const Educacion = require('../../models/educacion.js')(sequelize, DataTypes);

const deleteEducacion = async (req, res) => {
    const id = req.body.id;
    const id_persona = req.decoded.isAdmin ? req.body.id_persona : req.decoded.id_usuario;
    try {
        const educacion = await Educacion.findOne({
            where: {
                id,
                persona_id: id_persona
            }
        });
        if (!educacion) {
            return res.status(404).json({
                success: false,
                message: "Educación no encontrada",
                errorType: "RESOURCE_NOT_FOUND"
            });
        }
        await educacion.destroy();
        return res.status(200).json({
            success: true,
            message: "Educación eliminada exitosamente"
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: "Ha ocurrido un error en el servidor",
            errorType: "SERVER_ERROR"
        });
    }
}

module.exports = deleteEducacion;