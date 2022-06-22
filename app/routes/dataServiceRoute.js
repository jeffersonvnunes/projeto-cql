module.exports = function (app) {

    var controller = app.controllers.dataServiceController,
        baseRoute = app.routes.baseRoute;

    baseRoute.config('dataservices', controller);
};
