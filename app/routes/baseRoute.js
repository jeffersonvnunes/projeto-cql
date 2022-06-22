module.exports = function (app) {

    var route = {};

    route.config = function (name, controller){
        app.route('/'+name)
            .get(controller.listModel)
            .post(controller.saveModel);

        app.route('/'+name+'/:id')
            .get(controller.getModel)
            .delete(controller.removeModel);
    };

    return route;
};
