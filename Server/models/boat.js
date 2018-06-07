var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boat = new Schema({
    boatname: {
        type: String
    },
    crew: [
        {
            type: String,
			type: String
        }
    ],
    maxcrew:{
        type: Number
    }
},{
    collection: 'boat'
});

module.exports = mongoose.model('boat', boat);