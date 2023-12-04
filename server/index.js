const express = require("express");
const cors = require("cors");
const Sequelize = require("sequelize");
const db = require("./db");

const app = express();

app.use(cors());

app.get("/api/books", async (req, res) => {
  const result = await db.audiobooks.findAll();
  res.json(result);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Server has been started on port ${PORT}...`)
);
