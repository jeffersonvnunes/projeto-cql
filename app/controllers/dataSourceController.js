module.exports = function (app) {

    var cacheManager = require('../services/cacheManagerService'),
        appRoot = require('app-root-path'),
        winston = require(appRoot+'/config/winston'),
        Controller = require('./baseController'),
        controller = new Controller(),
        dataService = app.models.dataServiceModel;

    controller.Model = app.models.dataSourceModel;

    controller.getData = function(req, res) {

        function getFilterValue(filter, filterList){
            var resp = '',
                searchValue = filter.replace('[','').replace(']','').toUpperCase();

            for(var i = 0; i < filterList.length; i++){
                if(filterList[i].identifier.toUpperCase() === searchValue){
                    resp = filterList[i].value ? filterList[i].value : filterList[i].values[0].value;
                    break;
                }
            }

            return resp;
        }

        function getDataService(datasource, filterRequest, useCache){
            var http = require('http');

            var rex = /\[([^\[^\]]+)\]/g,
                filters = datasource.query.match(rex),
                selectedFilters = filterRequest ? filterRequest : datasource.filters,
                reqBody = datasource.query;
            var i;
            while(filters){
                for(i = 0; i < filters.length; i++){
                    reqBody = reqBody.replace(filters[i],getFilterValue(filters[i], selectedFilters));
                }

                filters = reqBody.match(rex);
            }
            try{
                reqBody = JSON.parse(reqBody);
            }catch (error) {
                winston.error("Got error: " + error.message);
                res.status(500).send(error.message);
            }

            function getProtocol(url){
                var rex = /^[a-zA-Z][a-zA-Z0-9+\-.]*:\/\//g,
                    protocol = url.match(rex);

                return protocol ? protocol[0].replace('//', '').toLowerCase(): 'http:'; ;
            }

            function getHost(url){
                var rex = /^([a-zA-Z][a-zA-Z0-9+\-.]*:\/\/)?([a-zA-Z0-9\-._~%!$&'()*+,;:=]+@)?([a-zA-Z0-9\-._~%]+|\[[a-zA-Z0-9\-._~%!$&'()*+,;=:]+\])/g,
                    host = url.match(rex);

                return  host ? host[0].toLowerCase().replace('http://', '').replace('https://', '') : '';
            }

            function getPort(url){
                var rex = /(:[0-9]+)(?=\/|)/g,
                    port = url.match(rex);

                return port ? port[0].replace(':','') : '';
            }

            function getPath(url){
                var rex = /(\/.*)/g,
                    path = url.replace('://', '').match(rex);

                return path ? path[0] : '';
            }

            function processRequest() {
                var options = {
                    protocol: getProtocol(datasource.apiURL),
                    host: getHost(datasource.apiURL),
                    port: getPort(datasource.apiURL),
                    path: getPath(datasource.apiURL),
                    method: datasource.requestAction,
                    headers: {
                        'Content-Type': 'application/json'
                    }
                };

                var dataString = '';

                var req = http.request(options, function (resp) {
                    resp.setEncoding('utf8');
                    resp.on('data', function (chunk) {
                        if (chunk !== null && chunk !== '') {
                            dataString += chunk;
                        }
                    });

                    resp.on('end', function () {
                        try {
                            if(!dataString || dataString === ''){
                                dataString = {
                                    query: []
                                };
                            } else{
                                dataString = JSON.parse(dataString);
                            }

                            if(!dataString.query){
                                dataString = {
                                    query: dataString
                                };
                            }

                            dataString.fields = [];

                            var item = dataString.query[0];

                            if(!item){
                                item = dataString.query;
                            }

                            for(var prop in item){
                                if(item.hasOwnProperty(prop)){
                                    dataString.fields.push(prop);
                                }
                            }

                            if(useCache){
                                cacheManager.addCache(datasource, selectedFilters, dataString);
                            }

                            res.json(dataString);
                        } catch (erro) {
                            winston.error("Got error: " + erro.message);
                            res.status(500).send(erro.message);
                        }
                    });
                });

                req.on("error", function (e) {
                    winston.error("Got error: " + e.message);
                    res.status(500).send();
                });

                req.write(JSON.stringify(reqBody));
                req.end();
            }

            var dataCache = useCache ?  cacheManager.getCache(datasource, selectedFilters) : null;

            if(useCache && dataCache){
                res.json(dataCache);
            }
            else if(datasource.dataservice){
                dataService.findById(datasource.dataservice).exec()
                    .then(
                        function(model) {
                            if (model){
                                datasource.apiURL = model.address + datasource.apiURL;
                                datasource.requestAction = model.requestAction;
                                processRequest();
                            } else{
                                res.status(404).send();
                            }
                        },
                        function(erro) {
                            winston.error(erro);
                            res.status(500).json(erro);
                        }
                    );
            }else{
                processRequest();
            }
        }

        if(req.body.query) {
            getDataService(req.body, '', false);
        }else{
            controller.Model.findById(req.params.id).exec()
                .then(
                    function(model) {
                        if (model){
                            getDataService(model, req.body.filters, model.useCache);
                        } else{
                            res.status(404).send();
                        }
                    },
                    function(erro) {
                        winston.error(erro);
                        res.status(500).json(erro);
                    }
                );
        }
    };

    return controller;
};