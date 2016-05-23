// EXTERNAL MODULES //
var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongoose = require('mongoose');

// CONFIG //
var config = require('./config.js');
// CONTROLLERS //
var UserCtrl = require('./controllers/UserCtrl');
var schoolCtrl = require('./controllers/schoolCtrl');

// SERVICES //
var passport = require('./services/passport');

// POLICIES //
var isAuthed = function(req, res, next) {
  if (!req.isAuthenticated()) return res.status(401).send();   //
  return next();
};

var app = express();
app.use(express.static(__dirname + './../public')); //this is how we send of all the front files from the sever
app.use(bodyParser.json());

app.use(session({       //references the config file required above
  secret: config.SESSION_SECRET,
  saveUninitialized: false,
  resave: false
}));

app.use(passport.initialize());
app.use(passport.session());

// CRUD //

//LOCAL AUTH//
app.post('/users', UserCtrl.register);
app.get('/me', isAuthed, UserCtrl.me);
app.put('/users/:_id', isAuthed, UserCtrl.update);
app.post('/login', passport.authenticate('local', {
  successRedirect: '/me'
}));
app.get('/logout', function(req, res, next) {
  req.logout();
  return res.status(200).send('logged out');
});

// SCHOOL DATA //
app.get('/api/schools', schoolCtrl.Readschoolnames)
app.get('/api/schools/:type', schoolCtrl.Getroughestimate)


// CONNECTIONS //
var mongoURI = config.MONGO_URI;
var port = config.PORT;

mongoose.connect(mongoURI);
mongoose.connection.once('open', function() {
  console.log('Connected to Mongo DB at', mongoURI);
  app.listen(port, function() {
    console.log('Listening on port '+ port);
  });
});
