// db.js
import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

console.log(process.env.DBNAME);

const pool = mysql.createPool({
  host: process.env.DBHOST,
  port: 3307,
  user: process.env.DBUSER,
  password: process.env.DBPASS,
  database: process.env.DBNAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;
