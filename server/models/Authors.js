const { DataTypes, Model } = require("sequelize");

const db = require("../db/index.js");

// class Authors extends Model {}

// exports.model = Authors.init(
//   {
//     id_author: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     name: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//   },
//   {
//     sequelize: db,
//     tableName: "authors",
//   }
// );

module.exports = (sequelize) => {
  const Authors = sequelize.define(
    "Authors",
    {
      id_author: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      sequelize: db,
      tableName: "authors",
    }
  );

  return Authors;
};
