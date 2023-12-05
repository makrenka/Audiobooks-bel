const Sequelize = require("sequelize");

const sequelize = new Sequelize("audiobooks", "root", "", {
  dialect: "mysql",
  host: "127.0.0.1",
  logging: false,
});

const Audiobooks = require("./Audiobooks")(sequelize);
const Authors = require("./Authors")(sequelize);
const Authors_books = require("./Authors_books")(sequelize);

Audiobooks.belongsToMany(Authors, {
  through: Authors_books,
  foreignKey: "id_book",
  otherKey: "id_author",
});

module.exports = {
  sequelize: sequelize,
  audiobooks: Audiobooks,
  authors: Authors,
  // authors_books: Authors_books,
};
