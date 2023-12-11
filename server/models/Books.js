import { Model, DataTypes } from "sequelize";

import Authors from "./Authors.js";
import AuthorsRefBooks from "./AuthorsRefBooks.js";
import db from "../db/index.js";

class Books extends Model {}

const model = Books.init(
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

model.belongsToMany(Authors, {
  as: "Authors",
  through: AuthorsRefBooks,
  foreignKey: "id_book",
  otherKey: "id_author",
});

export default model;
