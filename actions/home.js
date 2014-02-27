var logdebug = require('debug')('general');
var shortId = require('shortid');
var db = require('../lib/db.js');

exports.index = function(req, res){
  var email
  if(req.session.passport.user) email = req.session.passport.user.email
  res.render('index', {
    username: email
  });
};

exports.logout = function(req, res) {
  delete req.session.passport;
  res.redirect('/');
}

exports.connectDevice = function(req, res) {
  var connectionId = shortId.generate();
  var deviceSession = {user: req.session.passport.user.id, connectionId: connectionId}
  db.createDeviceSession(deviceSession, function(err, deviceSession) {
    if(err) {
      logerror("[INFO ][error creating deviceSession] %s :  Login {user: %s}",error,  connectionId);
    }
    logdebug("[INFO ][created deviceSession] User {user: %s}",  req.session.passport.user);
    res.render('connect-device', {
      connectionId: connectionId
    });
  });


}
