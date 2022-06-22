angular.module('projetocql').controller('DataServiceController',
    function($scope, $routeParams, DataService) {
        $scope.message = {};

        $scope.dataservice = {};

        if($routeParams.dataServiceId) {
            DataService.get({id: $routeParams.dataServiceId},
                function(dataservice) {
                    $scope.dataservice = dataservice;
                },
                function(erro) {
                    $scope.message = {
                        text: 'Fonte de Dados não encontrada.'
                    };
                }
            );
        } else {
            $scope.dataservice = new DataService();
            $scope.dataservice.active = true;
        }

        $scope.save = function() {
            $scope.dataservice.$save()
                .then(function() {
                    $scope.message = {text: 'Salvo com sucesso'};
                })
                .catch(function(erro) {
                    $scope.message = {text: 'Não foi possível salvar'};
                });
        };
    });