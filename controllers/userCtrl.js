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
    }

}