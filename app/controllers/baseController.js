module.exports = function () {

    var controller = {};

    controller.Model = null;

    controller.listModel = function(req, res) {

        controller.Model.find().exec()
            .then(
                function(models) {
                    res.json(models);
                },
                function(erro) {
                    console.error(erro);
                    res.status(500).json(erro);
                }
            );
    };

    controller.getModel = function(req, res) {

        var _id = req.params.id;
        controller.Model.findById(_id).exec()
            .then(
                function(model) {
                    if (model){
                        res.json(model);
                    } else{
                        res.status(404).send();
                    }
                },
                function(erro) {
                    console.log(erro);
                    res.status(404).json(erro);
                }
            );
    };

    controller.removeModel = function(req, res) {

        var _id = req.params.id;
        controller.Model.remove({"_id" : _id}).exec()
            .then(
                function() {
                    res.end();
                },
                function(erro) {
                    return console.error(erro);
                }
            );
    };

    controller.saveModel = function(req, res) {

        var _id = req.body._id;

        if(_id) {
            controller.Model.findByIdAndUpdate(_id, req.body).exec()
                .then(
                    function(model) {
                        res.json(model);
                    },
                    function(erro) {
                        console.error(erro);
                        res.status(500).json(erro);
                    }
                );
        } else {
            controller.Model.create(req.body)
                .then(
                    function(model) {
                        res.status(201).json(model);
                    },
                    function(erro) {
                        console.log(erro);
                        res.status(500).json(erro);
                    }
                );
        }
    };

    return controller;
};