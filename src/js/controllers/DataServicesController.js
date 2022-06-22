angular.module('projetocql').controller('DataServicesController',
    function(DataService, $scope, $mdDialog) {
        $scope.dataservices = [];
        $scope.filtro = '';
        $scope.message = {text: ''};

        function getDataServices() {
            DataService.query(
                function(dataservices) {
                    $scope.dataservices = dataservices;
                    $scope.message = {};
                },
                function(erro) {
                    console.log(erro);
                    $scope.message = {
                        text: 'Não foi possível obter a lista'
                    };
                }
            );
        }
        getDataServices();
        $scope.delete = function(ev, datasource) {

            var confirm = $mdDialog.confirm()
                .title('Deseja remover o serviço?')
                .targetEvent(ev)
                .ok('Confirmar')
                .cancel('Cancelar');

            var id = datasource._id;

            $mdDialog.show(confirm).then(function() {
                DataService.delete({id: id},
                    getDataServices,
                    function(erro) {
                        $scope.message = {
                            text: 'Não foi possível remover o serviço'
                        };
                        console.log(erro);
                    }
                );
            });
        };
    });