const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('egresados', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });


module.exports = sequelize;