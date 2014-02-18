var express = require('express');
var home = require('./actions/home.js');
var config = require('./config.json');
var db = require('./lib/db.js');

var passport = require("passport")
var facebookAuthStrategy = require('./authentication_strategies/facebook.js');

db.setup();

var app = express();
app.configure(function() {
  app.use(express.bodyParser());
  app.use( express.cookieParser() );
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static(__dirname + '/public'));
  app.use(express.session({ secret: 'long tailed tit' }));
  app.use(passport.initialize());
});

facebookAuthStrategy.init();

app.get('/', home.index);
app.get('/logout', home.logout);

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email'] }));
app.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/', failureRedirect: '/' }));

app.listen(process.env.PORT || config.port);
