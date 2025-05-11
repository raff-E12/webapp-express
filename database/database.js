
/**
 * WebApp Movie API:
 * @description - Comunicazione con il server MySQL.
 */

const mysql2 = require("mysql2");

const database = mysql2;
const connection_database = database.createConnection({
    host: "localhost",
    user: "root",
    password: "root_12*",
    database: "db_movies"
});

connection_database.connect((error) =>{
    if (error) throw error;
    return console.log(">> Database Collegato con successo...")
});

module.exports = connection_database;