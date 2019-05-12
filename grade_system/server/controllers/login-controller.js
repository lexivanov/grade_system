const User = require("../models/user");
const HttpError = require("error").HttpError;
const async = require('async');

exports.login = function(req, res){
const email = req.body.email;
const password = req.body.password;

    async.waterfall([
        function(callback){
            User.findOne({email}, callback);        
        },
        function(user, callback){
            if (user) {
                if (user.checkPassword(password)){
                    callback(null, user);
                } else {
                    next(new HttpError(403,"Incorrect password"));
                }
            } else {
                new HttpError(403, "User not found"); 
            }
        }
    ], function (err, user) {
        if (err) return next(err);
        req.session.user = user._id;
        res.send("Sucses!");
    });
};



