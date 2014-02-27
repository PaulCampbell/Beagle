var logdebug = require('debug')('general');
var db = require('../lib/db.js');

exports.connect = function(req,res) {
  db.findDeviceSessions(1, {connectionId: req.params['connectionId']}, function(err, deviceSession) {
    deviceSession[0].user = req.session.passport.user.id
    deviceSession[0].status = 'CONNECTED'
    console.log(deviceSession)
    res.render('in-session', {
      sessionId: deviceSession[0].id
    })
  });
}
