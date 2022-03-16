const mysql = require("mysql")

const dbData = {
    host: "localhost",
    user: "root",
    password: "",
    database: "livechat"
}

const con = mysql.createConnection(dbData);
con.connect((err) => {
    if (err) throw err;
    console.log("Connesso al Database");
})

function postMessage(msg){
    let username = msg["user"];
    let content = msg["content"];

    con.query("select idAccount from account where nome = '"+username+"'", (err, result) => {
        if (err) throw err;
        var idUser = result[0]["idAccount"];

        con.query("Insert into messaggi (codAccount, contenuto) values ("+idUser+", '"+content+"')", (err) => {
            if (err) throw err;
            console.log("Messaggio Registrato");
        });
    })
    
    return true;
}

module.exports = {postMessage};
