const ensureAuthenticated = require('../util/ensureAuthenticated');
const User= require('../models/user');
const passport = require('passport');

module.exports= function authApi(route) {
    route.route('/auth/login').post(passport.authenticate('local'),function(req, res){
        console.log("success")
        res.send(req.user);
    })

}
