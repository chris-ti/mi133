var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var boat = require('./boat.js')
var destination= require('./destination.js')

va0r logbook = new Schema({
    boat: {
		type: boat
	},
	destination:{
		type: destination
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