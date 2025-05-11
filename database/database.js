
/**
 * WebApp Movie API:
 * @description - Comunicazione con il server MySQL.
 */

const mysql2 = require("mysql2");
require("dotenv").config(); //Importazione di ".env" in configurazione.

const database = mysql2;
const connection_database = database.createConnection({
    host: `${process.env.MYSQL_HOST}`,
    user: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWORD}`,
    database: `${process.env.MYSQL_DATABASE_ACCESS}`
});

connection_database.connect((error) =>{
    if (error) throw error;
    return console.log(">> Database Collegato con successo...")
});

module.exports = connection_database;