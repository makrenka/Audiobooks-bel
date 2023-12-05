const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "Authors_books",
    {},
    {
      timestamps: false,
      tableName: "authors_books",
    }
  );
};
