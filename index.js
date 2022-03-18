const express = require("express");
const path = require("path")
const cors = require("cors");
const {postMessage, createAccount, loginAccount} = require("./server/connectDB");
const app = express();
const session = require("express-session");
const cookieParser = require("cookie-parser");

const db = require(path.join(__dirname + "/server/connectDB"))

const port = 80;

app.use(express.static(path.join(__dirname + "/public")));
app.use(cors())
app.use(express.json())
app.use(cookieParser());

// ******************* ROUTES SERVER ******************************

// GET Login Page
app.get(["/", "/login"], (req, res) => {
    res.sendFile(path.join(__dirname + "/index.html"));
})

//POST Login Page Handle Login Request

app.post("/login", async (req, res) => {
    let successo = await loginAccount(req.body);

    if (successo){
        res.status(200);
        res.cookie("username", req.body.user, {maxAge: 1000*60*15})
    }else{
        res.status(500);
        //res.redirect("/login");
    }

    res.send();
});

// GET Register Page
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname + "/registerPage.html"));
})

// User Sign-up Route
app.post("/register", async (req, res) => {
    let successo = createAccount(req.body);
    if (successo){
        res.status(200);
    }else{
        res.status(500);
    }
    res.send();
})



app.get("/chat", (req, res) => {
    if(req.cookies["username"]){
        res.sendFile(path.join(__dirname + "/chat.html"));
    } else res.redirect("/login");
})

// Posting Message Handler
app.post("/chat/sendMsg", async (req, res) => {
    let successo = await postMessage(req.body);
    if (successo){
        res.status(200);
    } else res.status(500);
   
    res.send()
})

app.listen(port, () => {console.log("In Funzione")});

