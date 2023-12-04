const express = require("express");
const cors = require("cors");
// const { AUDIOBOOKS } = require("./audiobooks");
const Sequelize = require("sequelize");
const db = require("./db");

function t01() {
  db.audiobooks.findAll().then((res) => {
    console.log(res);
  });
}
// t01();

async function t02() {
  const result = await db.audiobooks.findAll();
  console.log(result[0]);
}
t02();

const app = express();

app.use(cors());

// app.get("/api/books", (req, res) => {
//   res.json(AUDIOBOOKS);
// });

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Server has been started on port ${PORT}...`)
);
