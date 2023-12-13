const { DataTypes, Model } = require("sequelize");

const db = require("../db/index.js");
const Authors = require("./Authors.js")(db);
const AuthorsRefBooks = require("./AuthorsRefBooks.js")(db);

// class Books extends Model {}

// const model = Books.init(
//   {
//     id_book: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       autoIncrement: true,
//     },
//     title: {
//       type: DataTypes.STRING(100),
//       allowNull: false,
//     },
//     summary: {
//       type: DataTypes.STRING(2000),
//       allowNull: true,
//     },
//   },
//   {
//     sequelize: db,
//     tableName: "books_main",
//   }
// );

// model.belongsToMany(Authors, {
//   as: "Authors",
//   through: AuthorsRefBooks,
//   foreignKey: "id_book",
//   otherKey: "id_author",
// });

// exports.model;

module.exports = (sequelize) => {
  const Books = sequelize.define(
    "Books",
    {
      id_book: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      summary: {
        type: DataTypes.STRING(2000),
        allowNull: true,
      },
    },
    {
      sequelize: db,
      tableName: "books_main",
    }
  );

  Books.belongsToMany(Authors, {
    as: "Authors",
    through: AuthorsRefBooks,
    foreignKey: "id_book",
    otherKey: "id_author",
  });

  return Books;
};
