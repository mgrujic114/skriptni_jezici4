'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Kategorija extends Model {
   
    static associate({Usluga}) {
      this.hasMany(Usluga, {foreignKey: "kategorija_id", as: "kategorija"});
    }
  }
  Kategorija.init({
    naziv: DataTypes.STRING,
    koeficijent: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Kategorija',
  });
  return Kategorija;
};