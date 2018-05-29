var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var admin = new Schema({
    id: {
        type: String
    },
    username: {
        type: String
    },
    email:{
        type: String
    },
    firstName: {
        type: String
    },
    lastName:{
        type: String
    },
    password:{
        type:String
    }
},{
    collection: 'admin'
});

module.exports = mongoose.model('admin',admin)