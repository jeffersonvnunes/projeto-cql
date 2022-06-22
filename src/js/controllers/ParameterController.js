angular.module('projetocql').controller('ParameterController',
    function($scope, $routeParams, Parameter) {
        $scope.message = {};

        $scope.parameter = {};

        if($routeParams.parameterId) {
            Parameter.get({id: $routeParams.parameterId},
                function(parameter) {
                    $scope.parameter = parameter;
                },
                function(erro) {
                    $scope.message = {
                        text: 'Fonte de Dados não encontrada.'
                    };
                }
            );
        } else {
            $scope.parameter = new Parameter();
            $scope.parameter.active = true;
        }

        $scope.save = function() {
            $scope.parameter.$save()
                .then(function() {
                    $scope.message = {text: 'Salvo com sucesso'};
                })
                .catch(function(erro) {
                    $scope.message = {text: 'Não foi possível salvar'};
                });
        };

        $scope.addFilter = function () {
            $scope.parameter.filters.push({values:[]});
        };

        $scope.removeFilter = function(index){
            var removed = $scope.parameter.filters.splice(index,1)[0];

            if($scope.parameter.selectedFilter.identifier === removed.identifier){
                $scope.parameter.selectedFilter = undefined;
            }
        };

        $scope.addValues = function () {
            $scope.parameter.selectedFilter.values.push({});
        };

        $scope.removeValue = function(index){
            $scope.parameter.selectedFilter.values.splice(index,1);
        };

        $scope.setFilter = function (filter, index) {
            if($scope.parameter.selectedFilter !== filter){
                $scope.parameter.selectedFilter = filter;
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
    });