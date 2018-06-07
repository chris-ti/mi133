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
        type: Integer
    }
},{
    collection: 'boat'
});

module.exports = boat;
module.exports = mongoose.model('boat', boat);