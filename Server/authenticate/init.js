const passport = require('passport');
const session = require('express-session');
const {MemoryStore} = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
var _ = require('lodash');
const User= require('../models/user');
var bCrypt = require('bcrypt');

module.exports = function initAuth(app){
    const sessionId = 'addressbook.sid';
    const sessionSecret = 'secret';
    const sessionStore = new MemoryStore();
    const sessionConfig = {
        key: sessionId,
        secret: sessionSecret,
        resave: false,
        saveUninitialized: false,
        store: sessionStore
    };
    app.use(session(sessionConfig));
    app.use(passport.initialize());
    app.use(passport.session());
    passport.use('local', new LocalStrategy (
        function(username, password,done) {
            let temp={ _id: '5b0dafc1a1454d394cb81145',
                username: 'test12',
                password: '$2b$10$xgxI2WURzZggRILoeP0ndOwK5DjgQ0JeolB6/yNL95SlvmHJ7kyiS',
                email: 'yatishkumar.r@gmail.com',
                first_Name: 'yatish',
                last_Name: 'kumar',
                role: 'ADMIN',
                __v: 0 };

            if (!_.isString(username) || _.isEmpty(username)) {
                return done(null, false, { message: 'Incorrect Username.' });
            }
            if (!_.isString(password) || _.isEmpty(password)) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            User.findOne({username: username}, function (err, user){
                if (err) { return done(err); }
                if (!user) {
                    return done(null, false, { message: 'Invalid user.' });
                }
                if (!bCrypt.compareSync(password, user.password)) {
                    return done(null, false, { message: 'Incorrect password.' });
                }
                return done(null, user);
            });

        }
    ));

    passport.serializeUser(function(user, done) {
        console.log(user)
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

};