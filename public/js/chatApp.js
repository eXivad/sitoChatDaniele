var username = "";
getUsername();

const socket = io();

const chat = document.getElementById("chat");
const messageBoxTemplate = document.getElementById("msg");
const btnSend = document.getElementById("btnSend");
const textMsg = document.getElementById("textMsg");

//Aggiunta la possibilità di inviare messaggi con il tasto enter
var btnSendEnter = document.getElementById("textMsg"); 
btnSendEnter.addEventListener("keyup", function(event) {
    if (event.key === 'Enter') {                                             //event.keyCode === 13 a quanto pare è deprecated, sostituisco con event.key === 'Enter'
        event.preventDefault();
        document.getElementById("btnSend").click();
    }
});  

btnSend.addEventListener("click", checkMsg);

// Check the content of the message
function checkMsg(){
    if (textMsg.value === ''){
        alert("Nessun Messaggio Scritto");
    }else sendMessage();
}

// Function to POST a new Message
function sendMessage(){
    
    var message = {
        user: username,
        content: textMsg.value
    }

    fetch("/chat/sendMsg", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    }).then(()=>{
        createNewMessageBox(message);
        textMsg.value="";
        socket.emit("sendMsg", message)
    });
}

// Recive a new Message
socket.on("newMsg", (data) => {
    createNewMessageBox(data);
})

// Function for create a new Message Box
function createNewMessageBox(msg){
    const newMsg = messageBoxTemplate.cloneNode(true);

    newMsg.querySelector("#username").textContent = msg.user;
    newMsg.querySelector("#msgBody").textContent = msg.content;

    chat.appendChild(newMsg);
    chat.scrollTop = chat.scrollHeight;
}

// Fetch Cookie Username Logged
async function getUsername(){
    let temp = await fetch("/getUsername");
    temp = await temp.json();
    username = temp.username;
}