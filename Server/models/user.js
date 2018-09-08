const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var _ = require('lodash');

var user = new Schema({
    name: {
        type: String
    },
    username: {
        type: String
    },
    password:{
        type:String
    },
    role:{
        type:String
    }
},{
    collection: 'user'
});

module.exports = mongoose.model('user',user);
