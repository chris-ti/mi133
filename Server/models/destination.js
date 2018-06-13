var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var destination = new Schema({
    destination: {
        type: String
    },
    travelTime: {
        type: Number
    }
},{
    collection: 'destination'
});

module.exports = mongoose.model('destination', destination);
