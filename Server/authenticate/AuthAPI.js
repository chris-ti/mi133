const ensureAuthenticated = require('../util/ensureAuthenticated');
const User= require('../models/user');
const passport = require('passport');
const bCrypt = require('bcrypt');

module.exports= function authApi(route) {

    route.route('/auth/login').post(passport.authenticate('local'),function(req, res){
        res.send(req.user);
    })

    route.route('/auth/registerUser').post(function (req, res) {
        var username = req.body.username;
        //fetches user using username from mongodb
        User.findOne({'username': username},function(err, user) {
            // In case of any error return
            if (err){
                console.log('Error in SignUp: '+err);
                return res.send(err);
            }
            // already exists
            if (user) {
                console.log('User already exists');
                return res.send('User Already Exists');
            }
            else {
                // if there is no user with that email
                // create the user
                let newUser = new User();
                // set the user's local credentials
                newUser.username = req.body.user.username;
                newUser.password = createHash(req.body.user.password);
                newUser.name = req.body.user.name;
                newUser.role = req.body.user.role;
                // save the user
                newUser.save(function(err) {
                    if (err){
                        console.log('Error in Saving user: '+err);
                        throw err;
                    }
                    console.log('User Registration succesful');
                    //sends response back with success response
                    return res.send(newUser);
                });
            }
        });
    });

    let createHash = function(password){
        return bCrypt.hashSync(password,10);
    }
}
