var http = require('http'),
    app = require('./config/express')();

require('./config/database.js')('mongodb://'+app.get('MONGO_HOST')+'/'+app.get('MONGO_DATABASE'));

http.createServer(app).listen(app.get('port'), function(){
    console.log('Express Server escutando na porta ' +
        app.get('port'));
});