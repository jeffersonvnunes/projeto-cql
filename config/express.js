var express = require('express'),
    load = require('express-load'),
    bodyParser = require('body-parser');

module.exports = function() {
    var app = express();

    app.set('port', 3000);

    app.use(express.static('./public'));


    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    app.use(require('method-override')());

    load('models', {cwd: 'app'}).into(app);
    load('controllers/baseController.js', {cwd: 'app'})
        .then('controllers').into(app);
    load('routes/baseRoute.js', {cwd: 'app'})
        .then('routes').into(app);

    return app;
};