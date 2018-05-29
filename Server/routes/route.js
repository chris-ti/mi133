const express = require('express');
const app = express();
var User = require('../models/user');
const LogBookRouter = express.Router();

const LogBook = require('../models/logbook');

LogBookRouter.route('/add').post(function (req, res) {
    const logBook = new LogBook(req.body);
    logBook.save()
        .then(record => {
            res.json('Server added successfully');
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
});

LogBookRouter.route('/login').post(
    function(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        User.findOne({'username': username},
            function (err, user) {
                // In case of any error, return using the res method
                if (err)
                    return res.send(err);
                // Username does not exist, log error & redirect back
                if (!user) {
                    console.log('User Not Found with username ' + username);
                    return  res.status(404).send(' User Not found.');
                }
                // User exists but wrong password, log the error
                if (!isValidPassword(user, password)) {
                    console.log('Invalid Password');
                    return  res.status(401).send(' Invalid Password');
                }

                // res method which will be treated like success
                return  res.status(200).send({role:user.role});
            }
        );
    });

var isValidPassword = function(user, password){
    //library for hashing
    var bCrypt = require('bcrypt');
    // compares entered password with hashed password
    return bCrypt.compareSync(password, user.password);
}

LogBookRouter.route('/registerUser').post(function (req, res) {
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
            var newUser = new User();
            // set the user's local credentials
            newUser.username = req.param('username');
            newUser.password = createHash(req.param('password'));
            newUser.email = req.param('email');
            newUser.first_Name = req.param('first_name');
            newUser.last_Name = req.param('last_name');
            newUser.role = req.param('role')
            // save the user
            newUser.save(function(err) {
                if (err){
                    console.log('Error in Saving user: '+err);
                    throw err;
                }
                console.log('User Registration succesful');
                //sends response back with success response
                return res.send('User Registration succesful');
            });
        }
    });
});


var createHash = function(password){
    var bCrypt = require('bcrypt');
    return bCrypt.hashSync(password,10);
}



module.exports = LogBookRouter;