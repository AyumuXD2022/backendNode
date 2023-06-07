const express = require('express');
const bodyParser = require('body-parser')
const cors = require('cors')
const { API_VERSION } = require("./constants");

const app = express()

const authRouter = require("./router/auth");
const userRouter = require("./router/user");
const menuRouter = require("./router/menu");
const courseRouter = require("./router/course");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

app.use(cors())


app.use(`/api/${API_VERSION}`,authRouter)
app.use(`/api/${API_VERSION}`,userRouter)
app.use(`/api/${API_VERSION}`,menuRouter)
app.use(`/api/${API_VERSION}`,courseRouter)


app.use(express.static("uploads"))

module.exports = app;