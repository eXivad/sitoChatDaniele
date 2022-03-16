const express = require("express");
const { RR } = require("mysql/lib/PoolSelector");
const path = require("path")
const cors = require("cors")
const app = express();

const db = require(path.join(__dirname + "/server/connectDB"))

const port = 80;

app.use(express.static(path.join(__dirname + "/public")));
app.use(cors())
app.use(express.json())


app.get(["/", "/index.html"], (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})

app.get("/registerPage.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/registerPage.html"));
})

app.get("/chat.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/chat.html"));
})

app.post("/chat/sendMsg", (req, res) => {
    if (db.postMessage(req.body) === true){
        res.status = 200;
    } else res.status = 500;
    res.send()
})

app.listen(port, () => {console.log("In Funzione")});