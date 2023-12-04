const Sequelize = require("sequelize");

const sequelize = new Sequelize("audiobooks", "root", "", {
  dialect: "mysql",
  host: "127.0.0.1",
  logging: false,
});

const Audiobooks = require("./Audiobooks")(sequelize);

module.exports = {
  sequelize: sequelize,
  audiobooks: Audiobooks,
};
