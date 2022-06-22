angular.module('projetocql')
    .factory('PresentationService',
    function($resource, BackEndService,  BarChart, PieChart, TableChart, GRAPH_TYPE, $http, $q, Dashboard, DataSource) {
        var service = $resource(BackEndService.getServerAdress()+'/presentations/:id');

        service.getChart = function(data, query){
            var chart = undefined;
            switch (data.presentation){
                case GRAPH_TYPE.bar[0]:
                    chart = new BarChart(data, query);
                break;

                case GRAPH_TYPE.pie[0]:
                    chart = new PieChart(data, query);
                break;

                case GRAPH_TYPE.table[0]:
                    chart = new TableChart(data, query);
                    break;

                default:
                    chart = undefined;
            }

            if(chart && chart.amChartObj){
                chart.amChart = chart.toAmChart();
            }

            return chart;
        };

        service.getData = function (id, filters) {
            return DataSource.getData(id, filters);
        };

        service.show = function (textId, filters) {
            var dashboard = undefined,
                chart = undefined;

            return $q(function(resolve, reject) {
                Dashboard.get({id: textId},
                    function(data) {
                        dashboard = data;
                        service.getData(dashboard.datasource, filters).then(function (resp) {

                           chart = service.getChart(dashboard, resp.data);

                           resolve(chart);

                        }).catch(function (error) {
                            reject(error);
                        })
                    },
                    function(error) {
                        reject(error);
                    }
                );

            });
        };


        return service;
    });