module.exports = function (app) {

    var controller = app.controllers.parameterController,
        baseRoute = app.routes.baseRoute;

    baseRoute.config('parameters', controller);
};
