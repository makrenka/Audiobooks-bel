import { createNamespace } from "cls-hooked";

import Sequelize from "sequelize";
import env from "./env.config.js";

export const nameSpace = createNamespace("ns");
Sequelize.useCLS(nameSpace);

const db = new Sequelize({
  dialect: env.DB_TYPE,
  host: env.DB_HOSTNAME,
  logging: env.DB_LOG ? console.log : false,
  username: env.DB_USERNAME,
  password: `${env.DB_PASSWORD}`,
  port: env.DB_PORT,
  database: env.DB_DATABASE,
  timezone: "+00:00",
  define: {
    timstamps: false,
  },
});

export default db;

export function openConnection() {
  return db.authenticate();
}

export function closeConnection() {
  return db.close();
}
