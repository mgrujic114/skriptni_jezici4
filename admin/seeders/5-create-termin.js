'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('termins', [
        {id:"1", naziv: 'Termin 1', klijent: 'Klijent 1', vreme: new Date(), status: 'Aktivan', user_id: "1" },
        {id: "2", naziv: 'Termin 2', klijent: 'Klijent 2', vreme: new Date(), status: 'Aktivan', user_id: "1" },
        {id: "3", naziv: 'Termin 3', klijent: 'Klijent 3', vreme: new Date(), status: 'Aktivan', user_id: "1" },
      ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('termins', null, {});
  }
};
