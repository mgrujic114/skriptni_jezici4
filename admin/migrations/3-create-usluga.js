'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Uslugas', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      naziv: {
        type: Sequelize.STRING,
        allowNull: false
      },
      opis: {
        type: Sequelize.TEXT,
        allowNull: true
      },
      cena: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      kategorija_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      slika:{
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Uslugas');
  }
};