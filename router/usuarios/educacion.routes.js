const sequelize = require('../../connection/connectToDB.js');
const { DataTypes } = require('sequelize');
const Educacion = require('../../models/educacion.js')(sequelize, DataTypes);
const Ciudad = require('../../models/ciudades.js')(sequelize, DataTypes);
const Departamento = require('../../models/departamentos.js')(sequelize, DataTypes);

Ciudad.hasMany(Educacion, { foreignKey: 'id' });
Educacion.belongsTo(Ciudad, { foreignKey: 'ciudad_id', targetKey: "id"});

Departamento.hasMany(Educacion, { foreignKey: 'id' });
Educacion.belongsTo(Departamento, { foreignKey: 'departamento_id', targetKey: "id"});


function getTop10FrequentValues(arr, property, limit = 10) {
    const frequencyMap = new Map();

    arr.forEach(item => {
        const value = item[property];
        if (value !== undefined) {
            if (frequencyMap.has(value)) {
                frequencyMap.set(value, frequencyMap.get(value) + 1);
            } else {
                frequencyMap.set(value, 1);
            }
        }
    });

    const sortedFrequencies = Array.from(frequencyMap.entries())
        .sort((a, b) => b[1] - a[1])
        .slice(0, limit)
        .map(([value, count]) => ({
            [property]: value,
            frequency: count
        }));

    return sortedFrequencies;
};
const educacion = async (req, res) => {
    const persona_id = !req.decoded.isAdmin ? req.decoded.id_usuario : req.query.persona_id;
    const limit = !req.decoded.isAdmin ? null : req.query.limit;
    const property = req.query.property;
    if(!persona_id && !limit) {
        return res.status(400).json({
            success: false,
            message: "Como administrador, debes proporcionar una ID primero",
            errorType: "DATA_MISSING"
        });
    }
    if(limit && property) {
        const educacion = await Educacion.findAll();
        const top10 = getTop10FrequentValues(educacion, property, limit);
        return res.status(200).json({
            success: true,
            top10
        });
    }
    try {
        const educacion = await Educacion.findAll({
            where: {
                persona_id
            },
            include: [{
                model: Ciudad
            },
        {
            model: Departamento
        }]
        });
        return res.status(200).json({
            success: true,
            educacion
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


module.exports = educacion;