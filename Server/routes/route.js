const express = require('express');
const app = express();
var User = require('../models/user');
const LogBookRouter = express.Router();
const ensureAuthenticated = require('../util/ensureAuthenticated');
const LogBook = require('../models/logbook');

LogBookRouter.route('/getAllUsers').get(ensureAuthenticated,function (req, res) {
    User.find(function (err,result){
        res.send(result)
    });
});

LogBookRouter.route('/deleteUser/:userId').delete(ensureAuthenticated,function (req, res) {
    const {userId} = req.params
    console.log(userId)
    /*User.find(function (err,result){
        res.send(result)
    });*/
});


module.exports = LogBookRouter;