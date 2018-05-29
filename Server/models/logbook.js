var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var logbook = new Schema({
    id: {
        type: String
    },
    bootName: {
        type: String
    },
    crew: [
        {
            type: String
        }
    ],
    destination:{
        type:String
    },
    departure:{
        type:Date
    },
    arrival:{
        type:Date
    }

},{
    collection: 'logbook'
});

module.exports = mongoose.model('logbook', logbook);