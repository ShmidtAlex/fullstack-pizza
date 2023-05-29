import { Express } from "express";
import dotenv from 'dotenv';

dotenv.config();

const express = require('express')

const port = process.env.PORT;

const app: Express = express()

app.listen(port, () => console.log(`server works successfully on port ${port}`))