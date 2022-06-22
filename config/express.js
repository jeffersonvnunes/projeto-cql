var express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser');

module.exports = function() {
    var app = express();

    app.use(function (req, res, next) {

        res.setHeader('Access-Control-Allow-Origin', '*');

        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

        res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

        res.setHeader('Access-Control-Allow-Credentials', true);

        next();
    });

    app.set('port', 4000);

    //app.set('MONGO_DATABASE','projetocqlprod');
    app.set('MONGO_DATABASE','projetocql');

    app.set('MONGO_HOST','localhost');

    //app.use(express.static('./dist'));
    app.use(express.static('./src'));

    app.use(bodyParser.json({limit: '50mb'}));
    app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

    app.use(require('method-override')());

    load('models', {cwd: 'app'}).into(app);
    load('controllers/baseController.js', {cwd: 'app'})
        .then('controllers').into(app);
    load('routes/baseRoute.js', {cwd: 'app'})
        .then('routes').into(app);

    return app;
};