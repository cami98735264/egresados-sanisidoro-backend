const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('educacion', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    persona_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    institucion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    titulacion: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    fecha_inicio: {
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    fecha_fin: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    nivel_formacion: {
      type: DataTypes.ENUM('Formación técnica profesional','Tecnológica','Universitaria Profesional','Especialización universitaria','Maestría','Doctorado'),
      allowNull: false
    },
    ciudad_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    departamento_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    observaciones: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    nivel_academico: {
      type: DataTypes.ENUM('Posgrado','Pregrado','',''),
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'educacion',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "persona_id",
        using: "BTREE",
        fields: [
          { name: "persona_id" },
        ]
      },
    ]
  });
};
