module.exports = function (app) {

    var controller = app.controllers.dataSourceController,
        baseRoute = app.routes.baseRoute;

    baseRoute.config('datasources', controller);
};
