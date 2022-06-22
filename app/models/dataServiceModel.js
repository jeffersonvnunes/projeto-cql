var mongoose = require('mongoose');

module.exports = function() {

    var schema = mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        address:{
            type: String,
            required: true
        },
        requestAction:{
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        }
    });

    return mongoose.model('DataService', schema);
};