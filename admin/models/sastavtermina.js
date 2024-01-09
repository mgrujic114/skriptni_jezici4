'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SastavTermina extends Model {
  
    static associate({Usluga, Termin}) {
      this.belongsTo(Usluga, {foreignKey: "usluga_id", as: "usluga"});
      this.belongsTo(Termin, {foreignKey: "termin_id", as: "termin"});
    }
  }
  SastavTermina.init({
    naziv: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'SastavTermina',
  });
  return SastavTermina;
};