const sequelize = require('../../connection/connectToDB.js');
const { DataTypes } = require('sequelize');
const Educacion = require('../../models/educacion.js')(sequelize, DataTypes);
const Ciudad = require('../../models/ciudades.js')(sequelize, DataTypes);
const Departamento = require('../../models/departamentos.js')(sequelize, DataTypes);

Ciudad.hasMany(Educacion, { foreignKey: 'id' });
Educacion.belongsTo(Ciudad, { foreignKey: 'ciudad_id', targetKey: "id"});

Departamento.hasMany(Educacion, { foreignKey: 'id' });
Educacion.belongsTo(Departamento, { foreignKey: 'departamento_id', targetKey: "id"});

const addEducacion = async (req, res) => {
    const persona_id = req.decoded.id_usuario;
    const { institucion, titulacion, fecha_inicio, fecha_fin, nivel_academico, nivel_formacion, ciudad_id, departamento_id } = req.body;
    console.log(req.body);
    for(let key in req.body) {
        if(!req.body[key]) {
            return res.status(400).json({
                success: false,
                message: "Faltan campos por llenar",
                errorType: "DATA_MISSING"
            });
        }
    };
    try {
        const educacion = await Educacion.create({
            persona_id,
            institucion,
            titulacion,
            fecha_inicio,
            fecha_fin,
            nivel_academico,
            nivel_formacion,
            ciudad_id,
            departamento_id
        });
        const createdEducacion = await Educacion.findOne({
            where: {
                id: educacion.id
            },
            include: [{
                model: Ciudad
            },
            {
                model: Departamento
            }]
        });
        return res.status(201).json({
            success: true,
            message: "Educación guardada exitosamente",
            createdEducacion
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


module.exports = addEducacion;