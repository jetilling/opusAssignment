var app = require('../index'),
    db = app.get('db'),
    config = require('../config.json'),
    moment = require('moment'),
    randToken = require('rand-token'),
    sendGridCtrl = require('./sendGridCtrl.js');

module.exports = {

    addUser: function(req, res) {
        db.users.findOne({ email: req.body.email }, function(err, existingUser) {
            if (existingUser) {
                return res.status(409).send({ message: 'Email is already taken' });
            }
            else {
                var token = randToken.generate(16);
                db.add_New_User([req.body.email, req.body.firstName, req.body.lastName, token], function(err, success){
                    if(err) console.log(err);
                    else if (success) {
                        sendGridCtrl.sendNewUserEmail({email: req.body.email, firstName: req.body.firstName, token: token})
                        db.users.findOne({ email: req.body.email }, function (err, user){
                            if (err) console.log(err)
                            else res.status(200).send(user);
                        })
                    }
                })
            }
        })
    },

    getUsers: function(req, res) {
        db.get_Users(function(err, users) {
            if (err) console.log(err)
            else res.status(200).send(users)
        })
    },

    getLoggedInUser: function(req, res) {
        db.get_User_Info([req.params.id], function(err, user){
            if (err) console.log(err)
            else res.status(200).send(user)
        })
    },

    deleteUser: function(req, res) {
        db.delete_user([req.params.id], function(err, user){
            if (err) console.log(err)
            else res.status(200).send(true);
        })
    }

}