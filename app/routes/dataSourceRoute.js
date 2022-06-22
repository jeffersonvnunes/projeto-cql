module.exports = function (app) {

    var controller = app.controllers.dataSourceController,
        baseRoute = app.routes.baseRoute;

    baseRoute.config('datasources', controller);

    app.route('/datasources/:id/data')
        .get(controller.getData)
        .post(controller.getData);
};
