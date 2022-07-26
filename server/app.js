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

function storeData(req) {
  data = getData("../client/post.json");
  data.posts.push(req);
  let myJSON = JSON.stringify(data, null, 2);
  fs.writeFileSync("../client/post.json", myJSON);
}

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

// Creating a new post

// app.post("/", (req, res) => {
//   const newPost = {
//     title: req.body.ttile,
//     text: req.body.text,
//     comments: [],
//     reaction: { like: 0, love: 0, hate: 0 },
//     githy: [],
//   };

//   const newData = getData();
//   newPost["id"] = newData.posts.length + 1;
//   newData.posts.push(newPost);

//   res.status(201).json({
//     success: true,
//     posts: newPost,
//   });

//   // Save new post to json file

//   let myJson = JSON.stringify(newData);
//   fs.writeFileSync("../client/post.json", myJson, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("../client/post.json");
//     }
//   });
// });

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
// app.post("/reactions/:id", (req, res) => {
//   let id = req.params.id;
//   let newReaction = req.body.reaction;
//   let newData = getData();
//   newData.posts.forEach((post) => {
//     if (post.id == id) {
//       if (newReaction == "like") {
//         posts["reaction"]["like"] += 1;
//       }
//     }
//   });

//   let myJson = JSON.stringify(newData);
//   fs.writeFileSync("../client/post.json", myJson, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("../client/post.json");
//     }
//   });

//   res.redirect("/");
// });

module.exports = app;
