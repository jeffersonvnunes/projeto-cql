var mongoose = require('mongoose');

module.exports = function() {
    var schema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            maxlenth: [50,'The value of {PATH} ({VALUE}) exceeds the maximum allowed length ({MAXLENGTH}).']
        },
        active: {
            type: Boolean,
            required: true
        }
    });

    return mongoose.model('Dashboard', schema);
};