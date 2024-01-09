'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('users',
    [
        {id:"1",username:"admin", password: bcrypt.hashSync("admin", 10), admin:true, email:"admin@gmail.com"},
        {id:"2",username:"user", password: bcrypt.hashSync("user", 10), admin:false, email:"user@gmail.com"}
    ]); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};