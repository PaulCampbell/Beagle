var logdebug = require('debug')('general');

exports.index = function(req, res){
  console.log(JSON.stringify(req.session))
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

