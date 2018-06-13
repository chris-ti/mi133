var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var boat = new Schema({
    boatName: {
        type: String
    },
    crew: [
        {
            type: String,
			type: String
        }
    ],
    maxCrew:{
        type: Number
    },
    available:{
        type: Boolean
    }
},{
    collection: 'boat'
});

module.exports = mongoose.model('boat', boat);