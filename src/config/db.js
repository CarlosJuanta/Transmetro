const mysql = require('mysql2/promise');
const config = require('./index');

const pool = mysql.createPool({
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  port: config.dbPort,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = pool;