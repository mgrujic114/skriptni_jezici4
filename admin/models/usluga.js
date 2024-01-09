'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usluga extends Model {
  
    static associate({Kategorija, IzabranaOpcija, SastavTermina}) {
      this.belongsTo(Kategorija, {foreignKey: "kategorija_id", as: "kategorija"});
      this.hasMany(IzabranaOpcija, {foreignKey: "usluga_id", as: "opcije"});
      this.hasMany(SastavTermina, {foreignKey: "usluga_id", as: "usluge"});
    }
  }
  Usluga.init({
    naziv: DataTypes.STRING,
    opis: DataTypes.TEXT,
    cena: DataTypes.FLOAT,
    slika: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Usluga',
  });
  return Usluga;
};