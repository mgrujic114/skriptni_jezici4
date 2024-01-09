'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sastavterminas', [
      {id: "1", usluga_id: "1", termin_id: "1",},
      {id:"2", usluga_id: "2", termin_id: "2"},
      {id: "3", usluga_id: "1", termin_id: "3"},
      {id: "4", usluga_id: "2", termin_id: "3"},
      {id: "5", usluga_id: "3", termin_id: "1"}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sastavterminas', null, {});
  }
};
