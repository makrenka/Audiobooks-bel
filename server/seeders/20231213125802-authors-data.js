"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert("authors", [
      {
        name: "Laurie Forest",
      },
      {
        name: "Emily R. King",
      },
    ]);

    await queryInterface.bulkInsert("authors_ref_books", [
      {
        id_author: 1,
        id_book: 1,
      },
      {
        id_author: 1,
        id_book: 2,
      },
      {
        id_author: 1,
        id_book: 3,
      },
      {
        id_author: 1,
        id_book: 4,
      },
      {
        id_author: 2,
        id_book: 5,
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("authors", null);
    await queryInterface.bulkDelete("authors_ref_books", null);
  },
};
