var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var user = new Schema({
    id: {
        type: String
    },
    username: {
        type: String
    },
    email:{
        type: String
    },
    first_Name: {
        type: String
    },
    last_Name:{
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

module.exports = mongoose.model('user',user)