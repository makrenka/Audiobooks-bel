"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("books_main", {
      id_book: {
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        type: Sequelize.DataTypes.INTEGER,
      },
      title: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
      },
      summary: {
        type: Sequelize.DataTypes.STRING(1000),
        allowNull: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("books_main");
  },
};
