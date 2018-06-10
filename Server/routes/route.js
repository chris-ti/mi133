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
    const {userId} = req.params;
    User.deleteOne({'_id': userId}, function (err, result) {
        if (err){
            console.log('Error in removing user: '+err);
            return res.send(err);
        }
    });
    res.status(200).send('User Removed Successfully');

});


module.exports = LogBookRouter;