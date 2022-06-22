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
        fields: {
            type: Array
        },
        query: {
            type: String,
            required: true
        },
        apiURL:{
            type: String
        },
        requestAction:{
            type: String
        },
        useCache: {
            type: Boolean
        },
        cacheTime: {
            type: Number
        },
        active: {
            type: Boolean,
            required: true
        },
        dataservice: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'DataService'
        },
        filters: [filtersSchema]
    });

    return mongoose.model('DataSource', schema);
};