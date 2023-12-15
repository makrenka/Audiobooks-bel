"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("authors", {
      id_author: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.DataTypes.STRING(100),
        allowNull: false,
      },
    });

    await queryInterface.createTable("authors_ref_books", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_author: {
        primaryKey: true,
        type: Sequelize.DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
      id_book: {
        primaryKey: true,
        type: Sequelize.DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
    });

    await queryInterface.createTable("categories", {
      id_category: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name_category: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
    });

    await queryInterface.createTable("categories_ref_books", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_category: {
        unique: true,
        type: Sequelize.DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
      id_book: {
        unique: true,
        type: Sequelize.DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
    });

    await queryInterface.createTable("covers", {
      id_cover: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_book: {
        unique: true,
        type: Sequelize.DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
      url_cover: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });

    await queryInterface.createTable("covers_big_size", {
      id_cover_big_size: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_book: {
        unique: true,
        type: Sequelize.DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
      url_cover_big_size: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    });

    await queryInterface.createTable("sections", {
      id_section: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name_section: {
        type: Sequelize.DataTypes.STRING(50),
        allowNull: false,
      },
    });

    await queryInterface.createTable("sections_ref_books", {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_section: {
        unique: true,
        type: Sequelize.DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
      id_book: {
        unique: true,
        type: Sequelize.DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("authors");
    await queryInterface.dropTable("authors_ref_books");
    await queryInterface.dropTable("categories");
    await queryInterface.dropTable("categories_ref_books");
    await queryInterface.dropTable("covers");
    await queryInterface.dropTable("covers_big_size");
    await queryInterface.dropTable("sections");
    await queryInterface.dropTable("sections_ref_books");
  },
};
