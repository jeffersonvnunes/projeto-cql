module.exports = function (app) {

    var controller = app.controllers.dashboardController,
        baseRoute = app.routes.baseRoute;

    baseRoute.config('dashboards', controller);
};
