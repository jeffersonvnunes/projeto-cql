angular.module('projetocql').controller('VisualizationController',
    function($routeParams, PresentationService, $sce, $scope, $rootScope, Dashboard){

        $scope.message = {text:""};

        if($routeParams.textId) {
            $scope.idDash = $routeParams.textId;
            $scope.filtersSelected = [];

            $rootScope.hideNavbar = $routeParams.navbar ? $routeParams.navbar.toUpperCase() === 'HIDE' : false;

            Dashboard.getDataSourceFilterList($routeParams.textId).then(function (data) {
                $scope.filters = data;

                for(var i = 0; i < $scope.filters.length; i++){
                    $scope.filtersSelected.push({
                        identifier: $scope.filters[i].identifier,
                        description: $scope.filters[i].description,
                        getDescription: function () {
                            return this.description ? this.description : this.identifier;
                        }
                    });

                    $scope.filters[i].getDescription = function () {
                         return this.description ? this.description : this.identifier;
                    };
                }
            });

            function view(id) {
                $scope.loading = true;
                PresentationService.show(id, $scope.filtersSelected).then(function (chart) {
                    $scope.chart = chart;

                    if(chart && chart.amChartObj){
                        chart.amChart.write("chartdiv");
                    }else{
                        $scope.chartHTML = $sce.trustAsHtml(chart.write());
                    }

                    $scope.loading = false;
                }).catch(function (error) {
                    $scope.message.text = error.message;
                    $scope.loading = false;
                });
            }

            $scope.updateView = function () {
                view($scope.idDash);
            };

            view($scope.idDash);

        }else{
            $scope.message.text = "Dados não disponíveis";
        }
    });