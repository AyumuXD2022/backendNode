const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const { API_VERSION } = require("./constants");

const app = express()

const authRouter = require("./router/auth")

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(cors())


app.use(`/api/${API_VERSION}`,authRouter)


app.use(express.static("uploads"))

module.exports = app;