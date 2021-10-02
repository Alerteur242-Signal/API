const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const helmet = require('helmet');
const path = require('path');
const Vonage = require('@vonage/server-sdk');
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config();

const {
    DB_USER,
    DB_PWD,
    DB_URL,
    DB_NAME
} = process.env;

/**
 * MongoDB connection URI for the database to be used.
 */
mongoose.connect(`mongodb+srv://${DB_USER}:${DB_PWD}@${DB_URL}/${DB_NAME}?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connected to MongoDB');
    }).catch(err => {
        console.log('Error connecting to MongoDB: ' + err);
    });

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);



module.exports = app;