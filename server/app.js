const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const posts = require("../client/post.json");

const app = express();
app.use(express.json());
app.use(cors());

//function to get data from file

function getData() {
  let data = fs.readFileSync("../client/post.json");
  data = JSON.parse(data);
  return data;
}

// Retrive current data

//function to store data in the file
function storeData(req) {
  data = getData("../client/post.json");
  data.posts.push(req);
  let myJSON = JSON.stringify(data, null, 2);
  fs.writeFileSync("../client/post.json", myJSON);
}

//post data to form
app.get("/", (req, res) => {
  res.sendFile(path.resolve("../client/post.json"));
});

app.post("/", (req, res) => {
  data = req;
  currentData = getData();

  let id = currentData.posts.length + 1;
  let title = req.body.title;
  let text = req.body.text;
  let comments = req.body.comments;
});

// Adding a post to the file
app.post("/", (req, res) => {
  data = req;
  currentData = getData();

  let id = currentData.posts.length + 1;
  let title = req.body.title;
  let text = req.body.text;
  let comments = req.body.comments;

  storeData({
    id: id,
    title: title,
    text: text,
    comments: [],
  });
  res.status(201).json({
    success: true,
    posts: storeData,
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

  let myJson = JSON.stringify(newData, null, 2);
  fs.writeFileSync("../client/post.json", myJson, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("../client/post.json");
    }
  });

  res.redirect("/");
});

// Deleting a post

app.delete("/posts/:id", (req, res) => {
  let id = req.params.id;
  let currentData = getData();
  currentData.posts.forEach((post) => {
    if (post.id == id) {
      console.log(currentData[post]);
      currentData.posts.splice(id - 1, 1);
      let myJSON = JSON.stringify(currentData, null, 2);
      fs.writeFileSync("../client/post.json", myJSON);
    } else {
      console.log("failed!");
    }
  });
  console.log(currentData.posts);
  res.send("Deletion Complete!");
});

module.exports = app;
