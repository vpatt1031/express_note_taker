const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require('uniqid');

const data = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
//Read File 
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, response) => {
    if (err) throw err;
    // console.log(response)
    res.json(JSON.parse(response));
  });
});


// // Create New Note Items - takes in JSON input

app.post("/api/notes", (req, res) => {
  res.send("/api/notes");

  // // req.body hosts is equal to the JSON post sent from the user

  const newNote = req.body;

  newNote["id"] = uniqid()
  console.log(newNote);
  data.push(newNote);

// // Need fs.writeFile to update db.json with added note
  fs.writeFile('./db/db.json', JSON.stringify(data), err=> {
    if (err) throw err;
  })
});

app.delete('/api/notes/:id', (req, res) => {
  console.log(req.body)
  res.json(req.params.id)
  
// For loop to go through the array and select by id number assigned to new note
  for(i=0; i<data.length; i++){
    if(data[i].id == req.params.id){
      data.splice(i, 1)
    }
  }
// Need fs.writeFile to update db.json with the deleted note
  fs.writeFile('./db/db.json', JSON.stringify(data), err => {
    if(err) throw err;
  })
})

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log("listening");
});
