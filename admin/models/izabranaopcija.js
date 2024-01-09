'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class IzabranaOpcija extends Model {
   
    static associate({Usluga, Opcija}) {
      this.belongsTo(Usluga, {foreignKey: "usluga_id", as: "opcije"});
      this.belongsTo(Opcija, {foreignKey: "opcija_id", as: "usluge"});
    }
  }
  IzabranaOpcija.init({
    naziv: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'IzabranaOpcija',
  });
  return IzabranaOpcija;
};
