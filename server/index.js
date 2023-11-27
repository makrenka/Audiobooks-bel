const express = require("express");
const path = require("path");
const app = express();

app.get("/api", (req, res) => {
  res.json({
    message: "Hello from backend",
  });
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () =>
  console.log(`Server has been started on port ${PORT}...`)
);
