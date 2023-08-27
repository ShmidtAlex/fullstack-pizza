require('dotenv').config();
const sequelize = require('./db');
const models = require('./models/index');
const express = require('express');
const router = require('./routes/index');
const cookieParser = require('cookie-parser')
const path = require('path');

const errorHandler = require('./middleware/ErrorHandlingMiddleware');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const port = process.env.PORT || 5000;

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Add your frontend URL here
  credentials: true, //
}))
app.use('/static', express.static(path.resolve(__dirname, 'static')))
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(fileUpload({}))
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