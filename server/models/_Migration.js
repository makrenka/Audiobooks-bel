const { DataTypes } = require("sequelize");

const db = require("../db/index.js");

// class Migration extends Model {}

module.exports = (sequelize) => {
  const Migration = sequelize.define(
    "Migration",
    {
      filename: { type: DataTypes.STRING(255), primaryKey: true },
      appliedAt: { type: DataTypes.DATE, allowNull: false },
    },
    {
      sequelize: db,
      tableName: "_migrations",
    }
  );

  return Migration;
};

// module.exports = Migration.init(
//   {
//     filename: { type: DataTypes.STRING(255), primaryKey: true },
//     appliedAt: { type: DataTypes.DATE, allowNull: false },
//   },
//   {
//     sequelize: db,
//     tableName: "_migrations",
//   }
// );
