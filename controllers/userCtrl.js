var app = require('../index'),
    db = app.get('db'),
    config = require('../config.json'),
    moment = require('moment');

module.exports = {

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