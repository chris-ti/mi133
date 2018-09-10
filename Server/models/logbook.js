var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var boat = require('./boat.js')
var destination= require('./destination.js')

var logbook = new Schema({
    boatName: {
		type: String
	},
    crewName: [{
        type: String
    }],
	destination:{
		type: Schema.Types.ObjectId,
		required: true,
		ref: destination
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

//table address book example contacts.js/meapi.js --> save function carries /id withit. use id in poo
