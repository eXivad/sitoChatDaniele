document.getElementById("goRegistrati").addEventListener("click", () =>{
    window.open("./register", "_self");
})

const username = document.querySelector("input[name='username']");
const password = document.querySelector("input[name='password']");
const loginButton = document.querySelector("#loginSubmit");

loginButton.addEventListener("click", beginLogin);

function beginLogin(){
    var hashedPassword = String(CryptoJS.SHA3(password.value, {options: 224}));

    var newUser = {
        user: username.value,
        password: hashedPassword
    };

    sendPOST(newUser);
}

function sendPOST(newUser){
    fetch("/login", {
        method: "POST",
        mode: "cors",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(newUser)
    }).then((res) => {
        if(res.status === 200){
            alert("Accesso Riuscito");
            window.open("/chat", "_self")
        }else{
            alert("Accesso non Riuscito");
        }
    })
} 