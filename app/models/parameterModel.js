var mongoose = require('mongoose');

module.exports = function() {

    var valuesSchema = mongoose.Schema({
        description: String,
        value: String
    },{
        _id: false
    });

    var filtersSchema = mongoose.Schema({
        identifier: String,
        description: String,
        values: [valuesSchema]
    },{
        _id: false
    });

    var schema = mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        },
        filters: [filtersSchema]
    });

    return mongoose.model('Parameter', schema);
};