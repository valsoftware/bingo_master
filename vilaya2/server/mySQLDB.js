const mysql = require("mysql2");
const { json } = require("express");

const pool = new mysql.createConnection({
  host: "localhost",
  user: "bingo",
  password: "bingo",
  database: "games",
});


module.exports = {
  pool
};