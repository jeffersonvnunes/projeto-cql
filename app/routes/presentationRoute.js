module.exports = function (app) {

    var controller = app.controllers.presentationController,
        baseRoute = app.routes.baseRoute;

    baseRoute.config('presentations', controller);
};
