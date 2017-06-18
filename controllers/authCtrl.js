var app = require('../index'),
    db = app.get('db'),
    config = require('../config.json'),
    moment = require('moment'),
    jwt = require('jwt-simple'),
    bcrypt = require('bcrypt-nodejs');

function createJWT(user) {
  var payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix()
  };
  return jwt.encode(payload, config.TOKEN_SECRET);
}

function getSafeUser (user) {
  return {
    id: user.id,
    email: user.email,
    firstName: user.first_name,
    lastName: user.last_name,
    token: createJWT(user)
  }
}

module.exports = {

  getMe: function(req, res) {
    if (!req.user) return res.status(404);
    var user = req.user
    res.json(user)
  },

  login: function(req, res) {
        db.users.findOne({email: req.body.email}, function(err, user) {
            if (err) return res.status(500)
            if (!user) {
              return res.status(401).send({
                message: 'Invalid email and/or password'
              })
            }
            db.get_User_Password([user.id], function(err, candidatePassword){
              db.comparePassword = function(candidatePassword, password, cb) {
                bcrypt.compare(candidatePassword, req.body.password, function(err, isMatch) {
                  cb(err, isMatch);
                });
              };
                res.send( getSafeUser(user) )
            })
        })
  },

  register: function(req, res) {
    db.users.findOne({ email: req.body.email }, function(err, existingUser) {
      if (existingUser) {
        return res.status(409).send({ message: 'Email is already taken' });
      }
      else {
        bcrypt.genSalt(10, function(err, salt) {
          if (err) { return next(err); }
          bcrypt.hash(req.body.password, salt, null, function(err, hash) {
            if (err) { return next(err); }
            db.register_user([req.body.email, hash, req.body.firstName, req.body.lastName], function(err, users){
              db.users.findOne({email: req.body.email}, function(err, user){
                res.send( getSafeUser(user) );
              })
            })
          });

        });

      }
    });
  },

}