const express = require("express");
const path = require("path")
const cors = require("cors");
const {postMessage, createAccount, loginAccount, sessionStore} = require("./server/connectDB");
const session = require("express-session");
const http = require("http");
const socketio = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

const db = require(path.join(__dirname + "/server/connectDB"))

const port = 80;

app.use(express.static(path.join(__dirname + "/public")));
app.use(cors())
app.use(express.json())
app.use(session({
    secret: "59fea4f9e38bea9b6d06f8f08c819f764e4131a17e2a1a768195b9a2c72a17ec", //HASH di "MarcolinoMio"
    resave: true,
    saveUninitialized: true,
    store: sessionStore,
    cookie:{
        maxAge: 1000*60*60
    }
}));

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
        if(!req.session.username){
            req.session.username = req.body.user;
        }
    }else{
        res.status(500);
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


// GET Chat Page controll cookies
app.get("/chat", (req, res) => {
    if(req.session.username){
        res.sendFile(path.join(__dirname + "/chat.html"));
    } else res.redirect("/login");
})

// Enable Sockets for RLT comunication
io.on("connection", (socket) => {
    console.log("New User Connected");

    // When a Message is Sent Emit to Everybody
    socket.on("sendMsg", (data) => {
        socket.broadcast.emit("newMsg", data);
    })

})


// Control in the Session if there is a Logged User then it returns the Username
app.get("/getUsername", (req, res) => {
    if(req.session.username){
        res.json({username: req.session.username});
    }else {
        res.status(500);
    }
})

// POST Message and Store into the DB
app.post("/chat/sendMsg", async (req, res) => {
    let successo = await postMessage(req.body);
    if (successo){
        res.status(200);
    } else res.status(500);
   
    res.send()
})


// Open The Server
server.listen(port, () => {console.log("In Funzione")});

