var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var user = require('./user.js')

var boat = new Schema({
    boatName: {
        type: String
    },
    crewName: [
        {
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
