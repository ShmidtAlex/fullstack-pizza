require('dotenv').config();
const sequelize = require('./db');
const models = require('./models/index');
const express = require('express');
const cors = require('cors');
const port = process.env.PORT || 5000;
const router = require('./routes/index')
const app = express()
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(errorHandler)// must be last in the list
const start = async () => {
  try {
    await sequelize.authenticate() //connect to database
    await sequelize.sync() // check if database state overlaps with the scheme in ...
    app.listen(port, () => console.log(`server works successfully on port ${port}`))
  } catch(e) {
    console.log('UNABLE CONNECT TO A SERVER', e)
  }
}
start()