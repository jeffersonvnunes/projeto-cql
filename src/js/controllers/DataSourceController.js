angular.module('projetocql').controller('DataSourceController',
    function($scope, $routeParams, DataSource, DataService) {
        $scope.message = {};

        $scope.tested = false;
        $scope.querySize = 0;

        $scope.datasource = {};

        function getDataServices() {
            DataService.query(
                function(dataservices) {
                    $scope.dataservices = dataservices;
                },
                function(erro) {
                    console.log(erro);
                }
            );
        }

        getDataServices();

        if($routeParams.dataSourceId) {
            DataSource.get({id: $routeParams.dataSourceId},
                function(datasource) {
                    $scope.datasource = datasource;
                    $scope.requestOriginal = window.btoa($scope.datasource.requestAction +
                                                         $scope.datasource.apiURL +
                                                         $scope.datasource.query);

                    if(!$scope.datasource.filters){
                        $scope.datasource.filters = [];
                    }

                    $scope.tested = true;
                },
                function(error) {
                    $scope.message = {
                        text: 'Fonte de Dados não encontrada.'
                    };
                }
            );
        } else {
            $scope.datasource = new DataSource();
            $scope.datasource.active = true;
            $scope.datasource.useCache = false;
            $scope.datasource.filters = [];
        }

        $scope.addFilter = function () {
            $scope.datasource.filters.push({values:[]});
        };

        $scope.removeFilter = function(index){
            var removed = $scope.datasource.filters.splice(index,1)[0];

            if($scope.datasource.selectedFilter.identifier === removed.identifier){
                $scope.datasource.selectedFilter = undefined;
            }
        };

        $scope.addValues = function () {
            $scope.datasource.selectedFilter.values.push({});
        };

        $scope.removeValue = function(index){
            $scope.datasource.selectedFilter.values.splice(index,1);
        };

        $scope.setFilter = function (filter, index) {
            if($scope.datasource.selectedFilter !== filter){
                $scope.datasource.selectedFilter = filter;
                $scope.selectedFilterIndex = index;
            }
        };

        $scope.getFilterClass = function (index) {
            var resp = '';

            if(index === $scope.selectedFilterIndex){
                resp = 'filterSelected';
            }

            return resp;
        };

        $scope.save = function() {
            $scope.datasource.data = undefined;
            $scope.datasource.$save()
                .then(function() {
                    $scope.message = {text: 'Salvo com sucesso'};
                })
                .catch(function(error) {
                    $scope.message = {text: 'Não foi possível salvar'};
                });
        };

        $scope.setTested = function () {
            $scope.tested = $scope.requestOriginal === window.btoa($scope.datasource.requestAction +
                $scope.datasource.apiURL + $scope.datasource.query);
        };

        $scope.getTestButtonColor = function () {
            return $scope.tested ? 'btn-success' : 'btn-primary';
        };

        function getFilterValue(filter){
            var resp = '',
                searchValue = filter.replace('[','').replace(']','').toUpperCase();


            for(var i = 0; i < $scope.datasource.filters.length; i++){
                if($scope.datasource.filters[i].identifier.toUpperCase() === searchValue){
                    resp = $scope.datasource.filters[i].values[0].value;
                    break;
                }
            }

            return resp;
        }

        $scope.test = function(datasource) {
            datasource.datafields = [];
            datasource.data = [];

            var rex = /\[([^\[^\]]+)\]/g,
                filters = datasource.query.match(rex),
                request = {
                    query: datasource.query,
                    apiURL: datasource.apiURL,
                    requestAction: datasource.requestAction,
                    dataservice:  datasource.dataservice
                };
                var i;
                while(filters){

                    for(i = 0; i < filters.length; i++){
                        request.query = request.query.replace(filters[i],getFilterValue(filters[i]));
                    }

                    filters = request.query.match(rex);
                }
            $scope.loading = true;

            DataSource.getData(datasource._id,'',request)
                .then(function(resp) {
                    $scope.datasource.fields = resp.data.fields;
                    $scope.datasource.datafields = resp.data.fields;
                    $scope.datasource.data = resp.data.query;

                    $scope.requestOriginal = window.btoa($scope.datasource.requestAction +
                        $scope.datasource.apiURL + $scope.datasource.query);

                    $scope.tested = true;
                    $scope.loading = false;
                })
                .catch(function(error) {
                    $scope.message = {text: 'Não foi possível validar o SQL'};
                    $scope.loading = false;
                });
        };
    });