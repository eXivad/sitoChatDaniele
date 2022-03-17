const express = require("express");
const { RR } = require("mysql/lib/PoolSelector");
const path = require("path")
const cors = require("cors");
const {postMessage, createAccount, findAccount} = require("./server/connectDB");
const app = express();
const session = require("express-session");

const db = require(path.join(__dirname + "/server/connectDB"))

const port = 80;

app.use(express.static(path.join(__dirname + "/public")));
app.use(cors())
app.use(express.json())
/*
app.use(session({

}))
*/

// GET index.html
app.get(["/", "/index.html"], (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})

// GET Register Page
app.get("/registerPage.html", (req, res) => {
    res.sendFile(path.join(__dirname + "/registerPage.html"));
})

app.post("/register", (req, res) => {
    let successo = createAccount(req.body);
    if (successo){
        res.status(200);
    }else{
        res.status(500);
    }
    res.send();
})

// Enter in the Chat

app.post("/login", (req, res) => {
    let temp = findAccount(req.body);
    console.log(temp);
})

app.get("/chat.html", (req, res) => {


    res.sendFile(path.join(__dirname + "/chat.html"));
})

// Posting Message Handler
app.post("/chat/sendMsg", (req, res) => {
    if (db.postMessage(req.body) === true){
        res.status = 200;
    } else res.status = 500;
    res.send()
})

app.listen(port, () => {console.log("In Funzione")});