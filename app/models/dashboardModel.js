var mongoose = require('mongoose');

module.exports = function() {

    var valueFieldsSchema = mongoose.Schema({
        label: {
            type: String
        },
        value: {
            type: String
        },
        line: {
            type:Boolean
        },
        color: {
            type: String
        },
        backgroundColor: {
            type: String
        },
        dataFormat: {
            type: String
        }
    },{
        _id: false
    });

    var schema = mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true,
            maxlenth: [100,'The value of {PATH} ({VALUE}) exceeds the maximum allowed length ({MAXLENGTH}).']
        },
        identifier: {
            type: String,
            //required: true,
            trim: true,
            maxlenth: [50,'The value of {PATH} ({VALUE}) exceeds the maximum allowed length ({MAXLENGTH}).']
        },
        datasource: {
            type:  mongoose.Schema.Types.ObjectId,
            ref: 'DataSource'
        },
        active: {
            type: Boolean,
            required: true
        },
        presentation: {
            type: String
        },
        config: {
            serie:{
                type: String
            },
            serieLabel:{
                type: String
            },
            valueLabel:{
                type: String
            },
            valueFields: [valueFieldsSchema],
            zoomEnabled:{
                type: Boolean
            },
            donutStyle:{
                type: Boolean
            },
            showValueLabels:{
                type: Boolean
            },
            hideLegend:{
                type: Boolean
            }
        }
    });

    return mongoose.model('Dashboard', schema);
};