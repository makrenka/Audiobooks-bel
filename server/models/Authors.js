import { Model, DataTypes } from "sequelize";

import db from "../db/index.js";

class Authors extends Model {}

const model = Authors.init(
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

export default model;
