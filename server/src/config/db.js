const mysql = require('mysql2/promise')



const db = mysql.createPool({
  connectionLimit: 10,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
})

const testDatabaseConnection = async () => {
  const connection = await db.getConnection()

  console.log('Database connected successfully')

  connection.release()
}

module.exports = {
  db,
  testDatabaseConnection,
}