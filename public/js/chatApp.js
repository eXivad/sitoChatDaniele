const username = "eXivad"

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

    var message = {
        user: username,
        content: text
    }

    fetch("/chat/sendMsg", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(message)
    }).then();
}