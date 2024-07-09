var DataTypes = require("sequelize").DataTypes;
var _ciudades = require("./ciudades");
var _departamentos = require("./departamentos");
var _educacion = require("./educacion");
var _usuarios = require("./usuarios");

function initModels(sequelize) {
  var ciudades = _ciudades(sequelize, DataTypes);
  var departamentos = _departamentos(sequelize, DataTypes);
  var educacion = _educacion(sequelize, DataTypes);
  var usuarios = _usuarios(sequelize, DataTypes);


  return {
    ciudades,
    departamentos,
    educacion,
    usuarios,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
