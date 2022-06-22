angular.module('projetocql').controller('PresentationsController',
    function(PresentationService, $scope, $location, $mdDialog) {
        $scope.presentations = [];
        $scope.filtro = '';
        $scope.message = {text: ''};

        function getPresentations() {
            PresentationService.query(
                function(presentations) {
                    $scope.presentations = presentations;
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
        getPresentations();
        $scope.delete = function(ev, presentation) {

            var confirm = $mdDialog.confirm()
                .title('Deseja remover a apresentação?')
                .targetEvent(ev)
                .ok('Confirmar')
                .cancel('Cancelar');

            var id = presentation._id;

            $mdDialog.show(confirm).then(function() {
                PresentationService.delete({id: id},
                    getPresentations,
                    function(erro) {
                        $scope.message = {
                            text: 'Não foi possível remover a fonte de dados'
                        };
                        console.log(erro);
                    }
                );
            });
        };

        $scope.isComplete = function (presentation) {
            var resp;

            resp = presentation.views[0].dashboards.length > 0;

            return resp;
        };

        $scope.visualize = function (id) {
            $location.url('/presentationslide/'+id);
        }
    });
