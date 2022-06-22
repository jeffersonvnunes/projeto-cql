angular.module('projetocql').controller('DashboardController',
    function($scope, $routeParams, $sce, Dashboard, DataSource, GRAPH_TYPE, DATA_FORMAT, $http, PresentationService) {
        $scope.message = {};
        $scope.dashboard = {};

        $scope.presentations = GRAPH_TYPE;
        $scope.dataFormats = DATA_FORMAT;

        $scope.setFields = function () {
            var source;

            for(var i = 0;  $scope.datasources && i < $scope.datasources.length; i++){
                if($scope.datasources[i]._id === $scope.dashboard.datasource){
                    source = $scope.datasources[i];
                    break;
                }
            }

            $scope.datasourceselected = source;
            $scope.fields = source ? source.fields : undefined;
        };

        $scope.newValue = function (){
            $scope.dashboard.config.valueFields.push({
               value: '',
               label: '',
               line: false
            });
        };

        $scope.removeValue = function (index){
            $scope.dashboard.config.valueFields.splice(index,1);
        };

        $scope.visualizer = function () {
            $scope.messageModal = '<Não há dados disponíveis>';

            if($scope.dashboard.datasource){
                PresentationService.getData($scope.dashboard.datasource)
                    .then(function(resp) {
                        var chart = PresentationService.getChart($scope.dashboard, resp.data);

                        $scope.amChartObj = chart.amChartObj;

                        if(chart && chart.amChartObj){
                            chart.amChart.write("chartdiv");
                        }else{
                            $scope.chartHTML = $sce.trustAsHtml(chart.write());
                        }
                    })
                    .catch(function(erro) {
                        console.log(erro);
                        $scope.messageModal = 'Não foi possível apresentar os dados';
                    });
            }
        };

        $scope.isVisibleZoom = function () {
            var resp;

            resp = $scope.dashboard && $scope.dashboard.presentation === GRAPH_TYPE.bar[0];

            return resp;
        };

        $scope.isVisibleValueLabels = function () {
            var resp;

            resp = $scope.dashboard && $scope.dashboard.presentation === GRAPH_TYPE.bar[0];

            return resp;
        };

        $scope.isVisibleHideLegend = function () {
            var resp;

            resp = $scope.dashboard && $scope.dashboard.presentation === GRAPH_TYPE.bar[0];

            return resp;
        };

        $scope.isVisibleValueLabel = function () {
            var resp;

            resp = $scope.dashboard && $scope.dashboard.presentation === GRAPH_TYPE.bar[0];

            return resp;
        };

        $scope.isVisibleValues = function () {
            var resp;

            resp = $scope.dashboard &&($scope.dashboard.presentation === GRAPH_TYPE.bar[0] ||
                                       $scope.dashboard.presentation === GRAPH_TYPE.table[0]);

            return resp;
        };

        $scope.isVisibleSerie = function () {
            var resp;

            resp = $scope.dashboard && $scope.dashboard.presentation !== GRAPH_TYPE.table[0];
            return resp;
        };

        $scope.isImputSerieLabelSelect = function () {
            var resp;

            resp = $scope.dashboard && $scope.dashboard.presentation === GRAPH_TYPE.pie[0];

            return resp;
        };

        $scope.isVisibleDonut = function () {
            var resp;

            resp = $scope.dashboard && $scope.dashboard.presentation === GRAPH_TYPE.pie[0];

            return resp;
        };

        $scope.getSeieLabel = function () {
            var resp = 'Série';

            if($scope.dashboard && $scope.dashboard.presentation === GRAPH_TYPE.pie[0]){
                resp = 'Valor';
            }

            return resp;
        };

        $scope.isLineVisible = function () {
            var resp;

            resp = $scope.dashboard && $scope.dashboard.presentation === GRAPH_TYPE.bar[0];

            return resp;
        };

        $scope.isDataFormatVisible = function () {
            var resp;

            resp = $scope.dashboard && $scope.dashboard.presentation === GRAPH_TYPE.table[0];

            return resp;
        };

        $scope.isBackgroundColorVisible = function () {
            var resp;

            resp = $scope.dashboard && $scope.dashboard.presentation === GRAPH_TYPE.table[0];

            return resp;
        };

        $scope.isColorVisible = function () {
            var resp;

            resp = $scope.dashboard &&($scope.dashboard.presentation === GRAPH_TYPE.bar[0] ||
                                       $scope.dashboard.presentation === GRAPH_TYPE.table[0]);

            return resp;
        };

        $scope.getSeieRotuloLabel = function () {
            var resp = 'Rótulo Série';

            if($scope.dashboard && $scope.dashboard.presentation === GRAPH_TYPE.pie[0]){
                resp = 'Rótulo';
            }

            return resp;
        };

        function getDataSources() {
            DataSource.query(
                function(datasources) {
                    $scope.datasources = datasources;
                    $scope.setFields();
                },
                function(erro) {
                    console.log(erro);
                }
            );
        }

        getDataSources();

        if($routeParams.dashboardId) {
            Dashboard.get({id: $routeParams.dashboardId},
                function(dashboard) {
                    $scope.dashboard = dashboard;

                    $scope.setFields();
                },
                function(erro) {
                    $scope.message = {
                        text: 'Fonte de Dados não encontrada.'
                    };
                }
            );
        } else {
            $scope.dashboard = new Dashboard();
            $scope.dashboard.active = true;
            $scope.dashboard.config = {};
            $scope.dashboard.config.valueFields = [];
        }

        $scope.save = function() {
            $scope.dashboard.$save()
                .then(function() {
                    $scope.message = {text: 'Salvo com sucesso'};
                })
                .catch(function(erro) {
                    $scope.message = {text: 'Não foi possível salvar'};
                });
        };
    });