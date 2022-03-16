const express = require("express");
const path = require("path")
const app = express();

const port = 80;

app.use(express.static(path.join(__dirname + "/public")));


app.get(["/", "/index.html"], (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})

app.get("/registerPage.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/registerPage.html"));
})

app.get("/chat.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/chat.html"));
})

app.listen(port, () => {console.log("In Funzione")});