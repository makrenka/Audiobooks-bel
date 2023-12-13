const { DataTypes, Model } = require("sequelize");
const db = require("../db/index.js");

// class AuthorsRefBooks extends Model {}

// exports.model = AuthorsRefBooks.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//       allowNull: false,
//     },
//     id_author: {
//       unique: true,
//       type: DataTypes.BIGINT(20).UNSIGNED,
//       allowNull: false,
//     },
//     id_book: {
//       unique: true,
//       type: DataTypes.BIGINT(20).UNSIGNED,
//       allowNull: false,
//     },
//   },
//   {
//     sequelize: db,
//     tableName: "authors_ref_books",
//   }
// );

module.exports = (sequelize) => {
  const AuthorsRefBooks = sequelize.define(
    "AuthorsRefBooks",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      id_author: {
        unique: true,
        type: DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
      id_book: {
        unique: true,
        type: DataTypes.BIGINT(20).UNSIGNED,
        allowNull: false,
      },
    },
    {
      sequelize: db,
      tableName: "authors_ref_books",
    }
  );

  return AuthorsRefBooks;
};
