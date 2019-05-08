'use strict';

require('dotenv').config;
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const passport = require('./config/passport-config');
const InstagramStrategy = require('./config/passport-instagram-strategy');
const LocalStrategy = require('./config/passport-local-strategy');
const { dbName, dbUrl } = require('./config/db');

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const exploreRouter = require('./routes/explore');
const manageRouter = require('./routes/manage');

mongoose
  // .connect(`mongodb://localhost/${dbName}`, { useNewUrlParser: true })
  .connect(`${dbUrl}`, { useNewUrlParser: true, useFindAndModify: false })
  // .connect(process.env.MONGODB_URI, { useNewUrlParser: true, useFindAndModify: false })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch(err => {
    console.error('Error connecting to mongo', err);
  });

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Instagram config
app.use(session({
  secret: 'THIS IS MY SECRET',
  cookie: { maxAge: 3600000 * 1 }, // 1 hour
  resave: true,
  saveUninitialized: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    ttl: 24 * 60 * 60 // 1 day
    // ttl: 3600 // 1 hour
    // ttl: 600 // 10 minutes
  })
}));

passport.use(InstagramStrategy);
passport.use(LocalStrategy);
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRouter);
app.use('/explore', exploreRouter);
app.use('/manage', manageRouter);
app.use('/', indexRouter);
module.exports = app;
