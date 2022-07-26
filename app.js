const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const posts = require("../client/public/post.json");

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("../client/public"));




//Function to get data from the file
function getData() {
  let data = fs.readFileSync("../client/public/post.json");
  data = JSON.parse(data);
  return data;
}


// Function to store data in the file
function storeData(req) {
  data = getData("../client/public/post.json");
  data.posts.push(req);
  let myJSON = JSON.stringify(data, null, 2);
  fs.writeFileSync("../client/public/post.json", myJSON);
}

//Get Homepage
app.get("/", (req, res) => {
  res.sendFile(path.resolve("../client/public/index.html"));
})

// Post data to form
app.get("/posts", (req, res) => {
  res.sendFile(path.resolve("../client/public/post.json"));
});


// Adding a post to the file
app.post("/", (req, res) => {
  data = req;
  currentData = getData();
  console.log(req.body);
  
// Function to iterate through the data to find the highest ID
  let highestId = 0;
  currentData.posts.forEach((post) => {
    if (post.id > highestId) {
      highestId = post.id;
    }
  });
  // Allocate the data to variables
  let id = highestId + 1;
  let title = req.body.title;
  let text = req.body.text;
  let comments = req.body.comments;

// Call storeData function to add data to the file
  storeData({
    id: id,
    title: title,
    text: text,
    comments: [],
  });
  res.send(req.body);
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
  fs.writeFileSync("../client/public/post.json", myJson, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("../client/public/post.json");
    }
  });

  res.redirect("/");
});

// Deleting a post

app.delete("/posts/:id", (req, res) => {
  let id = req.params.id;
  let currentData = getData();
//Iterate through data to match the ID
  currentData.posts.forEach((post) => {
    if (post.id == id) {

//Cut out the data with the matching ID and rewrite the file
    currentData.posts.splice(id - 1, 1);
    let myJSON = JSON.stringify(currentData, null, 2);
    fs.writeFileSync("../client/public/post.json", myJSON);

    } else{
      console.log(post);

    }
  });
  console.log(currentData.posts);
  res.send("Deletion Complete!");
});

module.exports = app;
