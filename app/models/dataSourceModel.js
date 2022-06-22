var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        fields: {
            type: Array
        },
        query: {
            type: String,
            required: true
        },
        active: {
            type: Boolean,
            required: true
        }
    });

    return mongoose.model('DataSource', schema);
};