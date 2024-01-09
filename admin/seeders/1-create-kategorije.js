'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('kategorijas', [
      {id:"1",naziv:"kategorija1", koeficijent: "1"},
      {id:"2",naziv:"kategorija2", koeficijent:" 2"}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('kategorijas', null, {});
  }
};
