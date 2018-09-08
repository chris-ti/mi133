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
        done(null, user._id);
    });

    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

};
