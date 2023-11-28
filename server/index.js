const express = require("express");
const path = require("path");
const cors = require("cors");
const { AUDIOBOOKS } = require("./audiobooks");

const app = express();

app.use(cors());

app.get("/api/books", (req, res) => {
  res.json(AUDIOBOOKS);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Server has been started on port ${PORT}...`)
);
