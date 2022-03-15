const username = "Dabai"

const chat = document.getElementById("chat");
const msg = document.getElementById("msg");
const btnSend = document.getElementById("btnSend");
const textMsg = document.getElementById("textMsg");

btnSend.addEventListener("click", checkMsg);

function checkMsg(){
    if (textMsg.value === ''){
        alert("Nessun Messaggio Scritto");
    }else sendMessage();
}

function sendMessage(){
    let text = textMsg.value;

    const newMsg = msg.cloneNode(true);

    newMsg.querySelector("#username").textContent = username;
    newMsg.querySelector("#msgBody").textContent = text;

    chat.appendChild(newMsg);
    textMsg.value="";
    chat.scrollTop = chat.scrollHeight;
}