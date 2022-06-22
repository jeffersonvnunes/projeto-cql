module.exports = function (app) {

    var Controller = require('./baseController'),
        controller = new Controller();

    controller.Model = app.models.parameterModel;

    return controller;
};