const express = require('express');
const path = require('path');
const fs = require('fs');

const data = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes

// module.exports = (app) => {

    app.get("/notes", (req, res) => {
        res.sendFile(path.join(__dirname, "./public/notes.html"));
    });
    
    app.get("/api/notes", (req, res) => {
        fs.readFile("./db/db.json", "utf-8", (err, response) => {
            if(err) throw err;
            // console.log(response)
            res.json(JSON.parse(response));
        });
        // res.json(data)
    });
//   };
  
      // Create New Note Items - takes in JSON input
app.post('/api/notes', (req, res) => {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    const newListItem = req.body;
  
    // Using a RegEx Pattern to remove spaces from newListItem
    // You can read more about RegEx Patterns later https://www.regexbuddy.com/regex.html
    newListItem.routeName = newListItem.name.replace(/\s+/g, '').toLowerCase();
    console.log(newListItem);
  
    data.push(newListItem);
    res.json(newListItem);  
});

    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, './public/index.html'));
    });
    
    
    app.listen(PORT, () => {
        console.log("listening");
    });



