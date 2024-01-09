'use strict';
const {
  Model
} = require('sequelize');
const sastavtermina = require('./sastavtermina');
module.exports = (sequelize, DataTypes) => {
  class Termin extends Model {
    
    static associate({SastavTermina}) {
      this.hasMany(SastavTermina, {foreignKey: "termin_id", as: "termini"});
    }
  }
  Termin.init({
    naziv: DataTypes.STRING,
    klijent: DataTypes.STRING,
    vreme: DataTypes.DATE,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Termin',
  });
  return Termin;
};