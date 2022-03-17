const mysql = require("mysql") // Include Driver MySQL

// Database Connection Configuration
const dbData = {
    host: "localhost",
    user: "root",
    password: "",
    database: "ChatDB"
}

// Oggetto Connessione
const con = mysql.createConnection(dbData);

// Tentativo di connessione
con.connect((err) => {
    if (err) throw err;
    console.log("Connesso al Database");
});

/*
    Funzione per Post Messaggio
    Oggetto deve contenere:
        - Username Mittente
        - Corpo del messaggio
        - IdMessaggio a cui si vuole Rispondere (Opzionale)
*/

function postMessage(msg){
    let username = msg["user"];
    let content = msg["content"];
    let idMessaggioRisposta = msg["idMsg"];

    con.query("select idAccount from account where nome = '"+username+"'", (err, result) => {
        if (err) throw err;
        var idUser = result[0]["idAccount"];

        if(idMessaggioRisposta === undefined){
            con.query("Insert into messaggi (codAccount, messsaggio) values ("+idUser+", '"+content+"')", (err) => {
                if (err) throw err;
                console.log("Messaggio Registrato");
            });
        } else {
            con.query("Insert into messaggi (codAccount, codMessaggioRisposta, messaggio) values ("+idUser+", "+idMessaggioRisposta+", '"+content+"')", (err) => {
                if (err) throw err;
                console.log("Messaggio Registrato");
            });
        }
    });
    return true;
}

/*
    Funzione per Registrare un Account

    Oggetto deve Contenere:
        - Username
        - Password già Crittata
        - foto
*/

function createAccount(accountInfo){
    let username = accountInfo["user"];
    let password = accountInfo["password"];

    con.query("Insert into Accounts (username, password) values ('"+username+"', '"+password+"')", (err) =>
        {
            if (err){
                return false;
                throw err;
            }

            return true;
        }
    )
}

module.exports = {postMessage, createAccount};
