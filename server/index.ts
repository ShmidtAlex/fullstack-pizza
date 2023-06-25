import { Express } from "express";
require('dotenv').config();
const sequelize = require('./db');
const models = require('../models/index.ts')
const express = require('express')

const port = process.env.PORT || 5000;

const app: Express = express()

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