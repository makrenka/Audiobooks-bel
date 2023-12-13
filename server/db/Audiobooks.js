const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "Audiobooks",
    {
      id_book: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      title: {
        type: Sequelize.STRING(100),
      },
      summary: {
        type: Sequelize.TEXT(),
      },
    },
    {
      timestamps: false,
      tableName: "books_main",
    }
  );
};