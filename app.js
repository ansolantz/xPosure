const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const session = require('express-session');
const axios = require('axios');
const MongoStore = require('connect-mongo')(session);
const passport = require('./config/passport-config'); // passport module setup and initial load
const InstagramStrategy = require('./config/passport-instagram-strategy');

var indexRouter = require('./routes/index');
const exploreRouter = require('./routes/explore');
const manageRouter = require('./routes/manage');

mongoose
  .connect('mongodb://localhost/instagram-auth', { useNewUrlParser: true })
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
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
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    // ttl: 24 * 60 * 60 // 1 day
    // ttl: 3600 // 1 hour
    ttl: 600 // 10 minutes
  }),
  secret: 'THIS IS MY SECRET',
  resave: false,
  saveUninitialized: false
}));

passport.use(InstagramStrategy);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', function (req, res) {
  res.render('home', { user: req.user });
});

app.get('/mymedia', ensureAuthenticated, function (req, res) {
  console.log(req.user);
  axios.get(req.user.media)
    .then(function (response) {
      const data = response.data.data;
      let user = req.user;
      user.images = data.map(img => img.images);
      res.render('mymedia', { user });
    });
});

app.get('/login', function (req, res) {
  res.render('login', { user: req.user });
});

// GET /auth/instagram
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  The first step in Instagram authentication will involve
//   redirecting the user to instagram.com.  After authorization, Instagram
//   will redirect the user back to this application at /auth/instagram/callback
app.get('/authenticate',
  passport.authenticate('instagram'),
  function (req, res) {
    // The request will be redirected to Instagram for authentication, so this
    // function will not be called.
  });

// GET /auth/instagram/callback
//   Use passport.authenticate() as route middleware to authenticate the
//   request.  If authentication fails, the user will be redirected back to the
//   login page.  Otherwise, the primary route function function will be called,
//   which, in this example, will redirect the user to the home page.
app.get('/auth/',
  passport.authenticate('instagram', { failureRedirect: '/login' }),
  function (req, res) {
    res.redirect('/mymedia');
  });

app.get('/logout', function (req, res) {
  req.session.destroy(function (err) {
    console.log('session destroyed');
  });
  req.logout();
  res.redirect('/');
});

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated (req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/login');
}

module.exports = app;
