var app = require('../index'),
    db = app.get('db'),
    moment = require('moment'),
    jwt = require('jwt-simple'),
    bcrypt = require('bcrypt-nodejs'),
    randToken = require('rand-token');
    sendGridCtrl = require('./sendGridCtrl.js');

function createJWT(user) {
  var payload = {
    sub: user.id,
    iat: moment().unix(),
    exp: moment().add(1, 'day').unix()
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET);
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
              db.add_login_date([user.id], function(err){
                if(err) console.log(err)
              })
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
        var token = randToken.generate(16);
        bcrypt.genSalt(10, function(err, salt) {
          if (err) { return next(err); }
          bcrypt.hash(req.body.password, salt, null, function(err, hash) {
            if (err) { return next(err); }
            db.register_user([req.body.email, hash, req.body.firstName, req.body.lastName, token], function(err, users){
              db.users.findOne({email: req.body.email}, function(err, user){
                if (user) sendGridCtrl.sendValidationEmail({email: user.email, firstName: user.first_name, token: token});
                res.send( getSafeUser(user) );
              })
            })
          });

        });

      }
    });
  },

  validateUser: function(req, res) {
    console.log('hey');
    console.log(typeof req.body.token);
    db.validate_email([req.body.token], function(err, success) {
      if(err) console.log("Error: ", err);
      else res.status(200).send(true);
    })
  }
}