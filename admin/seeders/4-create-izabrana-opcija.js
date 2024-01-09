'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('izabranaopcijas', [
      {id: "1", opcija_id: "1", usluga_id: "1"},
      {id:"2", opcija_id: "2", usluga_id: "2"},
      {id:"3", opcija_id: "3", usluga_id: "2"},
      {id:"4", opcija_id: "3", usluga_id: "3"}
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('izabranaopcijas', null, {});
  }
};
