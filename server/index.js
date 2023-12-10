// const express = require("express");
// const cors = require("cors");
// const Sequelize = require("sequelize");

import db, { closeConnection, openConnection } from "./db";
import { runMigrations } from "./migration";
import Books from "./models/Books";

// import db from "./db";

// const app = express();

// app.use(cors());

// app.get("/api/books", async (req, res) => {
//   const result = await db.local_books.findAll({
//     include: db.authors,
//   });
//   res.json(result);
// });

// const PORT = process.env.PORT || 3001;

// app.listen(PORT, () =>
//   console.log(`Server has been started on port ${PORT}...`)
// );

async function main() {
  try {
    await openConnection();

    await runMigrations();

    console.info("Connected");

    await db.transaction(async () => {
      const book = new Books({ title: "Book" });
      await book.save();

      const books = await Books.findAll();
      console.info(books[0].title);
    });

    await closeConnection();
  } catch (err) {
    console.error(err);
  }
}

main();
