const mysql = require("mysql2") // Include Driver MySQL
const bluebird = require("bluebird");

// Database Connection Configuration
const dbData = {
    host: "localhost",
    user: "root",
    password: "",
    database: "ChatDB"
}

const con = mysql.createConnection(dbData).promise();
// Oggetto Connessione



/*
Tentativo di connessione
con.connect((err) => {
    if (err) throw err;
    console.log("Connesso al Database");
});
*/

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

    con.query("select idAccount from account where nome = '"+username+"'", (err, results) => {
        if (err) throw err;
        var idUser = results[0]["idAccount"];

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
            if (err) throw err;
        }
    )

    return true;
}

async function findAccount(accountInfo){
    let username = accountInfo["user"];
    let password = accountInfo["password"];

    const [rows, fields] = await con.execute("SELECT * from Accounts WHERE username = ?", [username]);
    return rows[0];
}

module.exports = {postMessage, createAccount, findAccount};
