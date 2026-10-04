require('dotenv').config()

const app = require('./app')
const {testDatabaseConnection} = require('./config/db')

const PORT = process.env.PORT || 3001

const startServer = async () => {
  try {
    await testDatabaseConnection()

    app.listen(PORT, () => {
      console.log(`Server running at ${process.env.SERVER_URL}`)
      console.log(`Server running on port ${PORT}`);
    })
  } catch (error) {
    console.error(`Database error: ${error.message}`)
    process.exit(1)
  }
}

startServer()