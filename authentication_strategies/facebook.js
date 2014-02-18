var passport = require('passport')
, FacebookStrategy = require('passport-facebook').Strategy
, config = require( '../config.json')
, db = require('../lib/db.js')
, logdebug = require('debug')('passport-debug')
, logerror = require('debug')('passport-error');

exports.init = function() {
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(obj, done) {
    done(null, obj);
  });
  passport.use(new FacebookStrategy({
    clientID: config.authentication.facebook.FACEBOOK_APP_ID,
    clientSecret: config.authentication.facebook.FACEBOOK_APP_SECRET,
    callbackURL: config.domain + "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    var emailAddress = profile.emails[0].value;
    if(!emailAddress) {
      emailAddress = profile.username + "@facebook.com"
    }
    db.findUserByEmail(emailAddress, function(err, user) {
      if(err) {
        var u = { email: emailAddress, accessToken: accessToken, refreshToken: refreshToken }
        db.saveUser(u, function(err, user) {
          if(err) {
            logerror("[INFO ][error created user] %s :  Login {user: %s}",error,  emailAddress);
          }
          logdebug("[INFO ][created user] Login {user: %s}",  emailAddress);
          done(null, user);
        });
      } else {
        logdebug("[INFO ][LoggedIn] Login {user: %s}", emailAddress);
        done(null, user);
      }
    });
  }))
}
