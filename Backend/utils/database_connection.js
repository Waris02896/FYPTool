const mysql = require('mysql')
const mysql2 = require('mysql2')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

if (process.env.DB_TYPE == "mysql") {
  db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    port: process.env.DB_PORT,
    waitForConnections: true,
  });
} else if (process.env.DB_TYPE == "mysql2") {
  db = mysql2.createPool({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE,
    password: process.env.DATABASE_PASSWORD,
    waitForConnections: true,
  })
}

module.exports = db
