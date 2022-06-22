module.exports = function (app) {

    var Controller = require('./baseController'),
        controller = new Controller();

    controller.Model = app.models.dashboardModel;

    return controller;
};