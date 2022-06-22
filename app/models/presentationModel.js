var mongoose = require('mongoose');

module.exports = function() {

    var dashboardSchema = mongoose.Schema({

        _id: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'Dashboard'
        },
        filtersSelected:{
            type: Array
        },
        sizeX:{
            type: Number
        },
        sizeY:{
            type: Number
        },
        row:{
            type: Number
        },
        col:{
            type: Number
        },
        updateInterval:{
            type: Number
        }
    },{
        _id: false
    });

    var viewSchema = mongoose.Schema({
        title:{
            type: String
        },
        slideInterval:{
            type: Number
        },
        active: {
            type: Boolean
        },
        dashboards:[dashboardSchema]
    },{
        _id: false
    });

    var schema = mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        views:[viewSchema],
        active: {
            type: Boolean,
            required: true
        }
    });

    return mongoose.model('Presentation', schema);
};