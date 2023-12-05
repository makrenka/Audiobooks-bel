const Sequelize = require("sequelize");

module.exports = function (sequelize) {
  return sequelize.define(
    "Authors",
    {
      id_author: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING(100),
      },
    },
    {
      timestamps: false,
      tableName: "authors",
    }
  );
};
