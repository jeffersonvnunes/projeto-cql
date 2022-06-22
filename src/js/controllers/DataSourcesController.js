angular.module('projetocql').controller('DataSourcesController',
    function(DataSource, $scope, $mdDialog) {
        $scope.datasources = [];
        $scope.filtro = '';
        $scope.message = {text: ''};

        function getDataSources() {
            DataSource.query(
                function(datasources) {
                    $scope.datasources = datasources;
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
        getDataSources();
        $scope.delete = function(ev, datasource) {

            var confirm = $mdDialog.confirm()
                .title('Deseja remover a fonte de dados?')
                .targetEvent(ev)
                .ok('Confirmar')
                .cancel('Cancelar');

            var id = datasource._id;

            $mdDialog.show(confirm).then(function() {
                DataSource.delete({id: id},
                    getDataSources,
                    function(erro) {
                        $scope.message = {
                            text: 'Não foi possível remover a fonte de dados'
                        };
                        console.log(erro);
                    }
                );
            });
        };
    });