const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const posts = require("../client/post.json");

const app = express();
app.use(express.json());
app.use(cors());

// Read current data from file

function getData() {
  let data = fs.readFileSync("../client/post.json");
  data = JSON.parse(data);
  return data;
}

// Retrive current data

app.get("/", (req, res) => {
  res.sendFile(path.resolve("../client/post.json"));
});

// Creating a new post

app.post("/newpost", (req, res) => {
  const newPost = req.body.text;
  console.log(req.body.text);
  const newData = getData();
  newPost["id"] = newData.posts.length + 1;
  newData.posts.push(newPost);

  res.status(201).json({
    success: true,
    posts: newPost,
  });

  // Save new post to json file

  let myJson = JSON.stringify(newData);
  fs.writeFileSync("../client/post.json", myJson, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("../client/post.json");
    }
  });
});

// Add comments
app.post("/comments/:id", (req, res) => {
  let id = req.params.id;
  let newComment = req.body.comments;
  let newData = getData();
  newData.posts.forEach((post) => {
    if (post.id == id) {
      post.comments.push(newComment);
    }
  });

  let myJson = JSON.stringify(newData);
  fs.writeFileSync("../client/post.json", myJson, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("../client/post.json");
    }
  });

  res.redirect("/");
});

// Add count reactions

module.exports = app;
