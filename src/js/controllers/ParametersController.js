angular.module('projetocql').controller('ParametersController',
    function(Parameter, $scope, $mdDialog) {
        $scope.parameters = [];
        $scope.filtro = '';
        $scope.message = {text: ''};

        function getParameters() {
            Parameter.query(
                function(parameters) {
                    $scope.parameters = parameters;
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
        getParameters();
        $scope.delete = function(ev, parameter) {

            var confirm = $mdDialog.confirm()
                .title('Deseja remover o parâmetro?')
                .targetEvent(ev)
                .ok('Confirmar')
                .cancel('Cancelar');

            var id = parameter._id;

            $mdDialog.show(confirm).then(function() {
                Parameter.delete({id: id},
                    getParameters,
                    function(erro) {
                        $scope.message = {
                            text: 'Não foi possível remover o parâmetro'
                        };
                        console.log(erro);
                    }
                );
            });
        };
    });