const mysql = require('mysql2/promise');
const config = require('./index');

const dbConfig = {
  host: config.dbHost,
  user: config.dbUser,
  password: config.dbPassword,
  database: config.dbName,
  port: config.dbPort,
  waitForConnections: true,
  connectionLimit: 10, 
  queueLimit: 0,
};


if (process.env.DB_SSL === 'true') {
  dbConfig.ssl = {
    rejectUnauthorized: true
  };
}

const pool = mysql.createPool(dbConfig);

module.exports = pool;