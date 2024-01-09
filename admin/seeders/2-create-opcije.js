'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('opcijas', [
      {id:"1",naziv:"opcija1", osnovna_cena: "1000.00"},
      {id:"2",naziv:"opcija2", osnovna_cena:" 1200.00"},
      {id:"3",naziv:"opcija3", osnovna_cena:" 800.00"}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('opcijas', null, {});
  }
};
