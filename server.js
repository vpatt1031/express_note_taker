const express = require('express')
const path = require('path')
const fs = require('fs')

const data = require("./db/db.json");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use(express.static("public"))

// Routes

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, response) => {
        if(err) throw err;
        // console.log(response)
        res.json(JSON.parse(response));
    })
    // res.json(data)
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})


app.listen(PORT, () => {
    console.log("I'M ALIVE!!!")
})