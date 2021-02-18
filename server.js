const express = require("express");
const path = require("path");
const fs = require("fs");
const uniqid = require('uniqid');

const data = require("./db/db.json");

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});
//what was added Saturday
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf-8", (err, response) => {
    if (err) throw err;
    // console.log(response)
    res.json(JSON.parse(response));
  });
});

// app.get("/api/notes", function(req, res) {
//     return res.json(data);
//   });

// // Create New Note Items - takes in JSON input



app.post("/api/notes", (req, res) => {
  res.send("/api/notes");

  // // req.body hosts is equal to the JSON post sent from the user
  // // This works because of our body parsing middleware
  const newNote = req.body;

  // // // Using a RegEx Pattern to remove spaces from newListItem
  // // // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
  // newNote.routeName = newNote.name.replace(/\s+/g, '').toLowerCase();
  newNote["id"] = uniqid()
  console.log(newNote);
  data.push(newNote);

// // Need fs.writeFile
  fs.writeFile('./db/db.json', JSON.stringify(data), err=> {
    if (err) throw err;
  })
// then((data) => {
//     const filename = `${data.name.toLowerCase().split(' ').join('')}.json`;

//     fs.writeFile(filename, JSON.stringify(data, null, '\t'), (err) =>
//       err ? console.log(err) : console.log('Success!')
//     );
//   });

// fs.writeFile('./db/db.json', JSON.stringify(data, null, '\t'), (err) => {
//     err ? console.log(err) : console.log('Success')
// });

//   res.json(newNote);
});
app.delete('/api/notes/:id', (req, res) => {
  console.log(req.body)
  res.json(req.params.id)
  
  for(i=0; i<data.length; i++){
    if(data[i].id == req.params.id){
      data.splice(i, 1)
    }
  }

  fs.writeFile('./db/db.json', JSON.stringify(data), err => {
    if(err) throw err;
  })
})

// 
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.listen(PORT, () => {
  console.log("listening");
});
