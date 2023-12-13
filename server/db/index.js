const { Sequelize } = require("sequelize");
const cls = require("cls-hooked");

const env = require("./env.config.js");

const nameSpace = cls.createNamespace("ns");
Sequelize.useCLS(nameSpace);
exports.nameSpace;

module.exports = new Sequelize({
  dialect: env.DB_TYPE,
  host: env.DB_HOSTNAME,
  logging: env.DB_LOG ? console.log : false,
  username: env.DB_USERNAME,
  password: `${env.DB_PASSWORD}`,
  port: env.DB_PORT,
  database: env.DB_DATABASE,
  timezone: "+00:00",
  define: {
    timestamps: false,
  },
});

// exports.openConnection = () => {
//   return db.authenticate();
// };

// exports.closeConnection = () => {
//   return db.close();
// };
