const express = require("express");
const cors = require("cors");
const fs = require("fs");

const app = express();
app.use(cors());

app.get("/", (req, res) => {
  const file = fs.readFileSync("word.txt");
  const convert = res.sendFile();
});

module.exports = app;
