var http = require('http'),
    app = require('./config/express')();

require('./config/database.js')('mongodb://localhost/projetocql');

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express Server escutando na porta ' +
        app.get('port'));
});