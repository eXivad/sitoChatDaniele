document.getElementById("goLogin").addEventListener("click", () =>{
    window.open("./index.html", "_self");
})

/*
    TODO: Script per registrare l'utente al DB
    1) Controllo Password
    2) Controllo Esistenza Username
    3) Crypto Password
    4) Registrazione (Fetch)
*/

const username = document.querySelector("input[name='username']");
const password = document.querySelector("input[name='password']");
const cfr_password = document.querySelector("input[name='confirm-password']");
const registerButton = document.querySelector("#registerSubmit");

registerButton.addEventListener("click", beginRegister);

function beginRegister(){
    if(password.value === cfr_password.value){
        var hashedPassword = String(CryptoJS.SHA3(password.value, {options: 224}));

        var newUser = {
            user: username.value,
            password: hashedPassword
        };

        sendPOST(newUser);
    }
}

function sendPOST(newUser){
    fetch("/register", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    }).then((res) => {
        if(res.status === 200){
            window.open("/", "_self");
        }else{
            alert("Errore Account non Creato");
        }
    })
} 