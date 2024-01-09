'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Opcija extends Model {
   
    static associate({IzabranaOpcija}) {
      this.hasMany(IzabranaOpcija, {foreignKey: "opcija_id", as: "usluge"});
    }
  }
  Opcija.init({
    naziv: DataTypes.STRING,
    osnovna_cena: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Opcija',
  });
  return Opcija;
};
