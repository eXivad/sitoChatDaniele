const mysql = require("mysql2") // Include Driver MySQL
const bluebird = require("bluebird");

// Database Connection Configuration
const dbData = {
    host: "localhost",
    user: "root",
    password: "",
    database: "ChatDB"
}


// Oggetto di connessione
// Con funzione Promise cosi posso avere i dati negli array
const con = mysql.createConnection(dbData).promise();

if (con){
    console.log("Connesso al Database");
}else{
    throw new Error("Errore di Connessione al Database");
}

/*
    Funzione per Post Messaggio
    Oggetto deve contenere:
        - Username Mittente
        - Corpo del messaggio
        - IdMessaggio a cui si vuole Rispondere (Opzionale)
*/

async function postMessage(msg){
    let username = msg["user"];
    let content = msg["content"];
    let idMessaggioRisposta = msg["idMsg"];

    var [rows] = await con.execute("SELECT idAccount from Accounts WHERE username = ?", [username]);
    if (rows.length < 0) return false;

    let idAccount = rows[0].idAccount;

    if(idMessaggioRisposta === undefined){
        [rows] = await con.execute("INSERT Into Messaggi (codAccount, messaggio) VALUES (?, ?)", [idAccount, content]);
    }else {
        [rows] = await con.execute("INSERT Into Messaggi (codAccount, codMessaggioRisposta, messaggio) VALUES (?, ?, ?)", [idAccount, idMessaggioRisposta, content]);
    }

    if (rows.affectedRows > 0){
        return true;
    } else{
        return false;
    }
}

/*
    Funzione per Registrare un Account

    Oggetto deve Contenere:
        - Username
        - Password già Crittata
        - foto
*/

async function createAccount(accountInfo){
    let username = accountInfo["user"];
    let password = accountInfo["password"];

    const [result] = await con.execute("INSERT into ACCOUNTS (username, password) values (?, ?)", [username, password]);
    if (result.affectedRows > 0){
        return true;
    } else{
        return false;
    }
}

/*
    Funzione per il Login dell'account
    Esegue la query di ricerca e controlla se esiste l'Account
    Se esiste viene controllata la Password

    Se tutto è corretto restituisce True(Accesso Effettuato)
    Se va male qualcosa restituisce False(Accesso Negato)
*/

async function loginAccount(accountInfo){
    let username = accountInfo["user"];
    let password = accountInfo["password"];

    const [rows] = await con.execute("SELECT * from Accounts WHERE username = ?", [username]);
    
    if (rows[0] !== undefined){
        if(rows[0]["password"] === password){
            return true;
        }
    }

    return false;
}

module.exports = {postMessage, createAccount, loginAccount};
