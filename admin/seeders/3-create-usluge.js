'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('uslugas', [
      {id:"1",naziv:"sisanje", opis:"opis usluge 1", cena: "1000.00", kategorija_id:1, slika:"https://cdn-icons-png.flaticon.com/128/2991/2991603.png?uid=R133223084&ga=GA1.1.409309779.1699384592&semt=ais"},
      {id:"2",naziv:"feniranje", opis:"opis usluge 2", cena: "4000.00", kategorija_id:2, slika: "https://cdn-icons-png.flaticon.com/128/11277/11277702.png?uid=R133223084&ga=GA1.1.409309779.1699384592&semt=ais"},
      {id:"3",naziv:"pranje kose", opis:"opis usluge 3", cena: "8000.00", kategorija_id:1, slika: "https://cdn-icons-png.flaticon.com/128/9419/9419005.png?uid=R133223084&ga=GA1.1.409309779.1699384592"},
      {id:"4",naziv:"sisanje", opis:"opis usluge 1", cena: "1000.00", kategorija_id:1, slika:"https://cdn-icons-png.flaticon.com/128/2991/2991603.png?uid=R133223084&ga=GA1.1.409309779.1699384592&semt=ais"},
      {id:"5",naziv:"feniranje", opis:"opis usluge 2", cena: "4000.00", kategorija_id:2, slika: "https://cdn-icons-png.flaticon.com/128/11277/11277702.png?uid=R133223084&ga=GA1.1.409309779.1699384592&semt=ais"},
      {id:"6",naziv:"pranje kose", opis:"opis usluge 3", cena: "8000.00", kategorija_id:1, slika: "https://cdn-icons-png.flaticon.com/128/9419/9419005.png?uid=R133223084&ga=GA1.1.409309779.1699384592"},
      {id:"7",naziv:"sisanje", opis:"opis usluge 1", cena: "1000.00", kategorija_id:1, slika:"https://cdn-icons-png.flaticon.com/128/2991/2991603.png?uid=R133223084&ga=GA1.1.409309779.1699384592&semt=ais"},
      {id:"8",naziv:"feniranje", opis:"opis usluge 2", cena: "4000.00", kategorija_id:2, slika: "https://cdn-icons-png.flaticon.com/128/11277/11277702.png?uid=R133223084&ga=GA1.1.409309779.1699384592&semt=ais"},
      {id:"9",naziv:"pranje kose", opis:"opis usluge 3", cena: "8000.00", kategorija_id:1, slika: "https://cdn-icons-png.flaticon.com/128/9419/9419005.png?uid=R133223084&ga=GA1.1.409309779.1699384592"}
    
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('uslugas', null, {});
  }
};
