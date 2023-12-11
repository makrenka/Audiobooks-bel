import { Model, DataTypes } from "sequelize";
import db from "../db/index.js";

class AuthorsRefBooks extends Model {}

const model = AuthorsRefBooks.init(
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

export default model;
