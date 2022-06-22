angular.module('projetocql').controller('DashboardsController',
    function(Dashboard, $scope, $location, $mdDialog,  GRAPH_TYPE) {
        $scope.dashboards = [];
        $scope.filtro = '';
        $scope.message = {text: ''};

        $scope.isComplete = function (dashboard) {
            var resp;

            resp = dashboard && dashboard.datasource && dashboard.presentation && dashboard.config.serie;

            if(resp && GRAPH_TYPE.pie[0] === dashboard.presentation){
                resp = resp && dashboard.config.serieLabel;
            }else if(GRAPH_TYPE.table[0] === dashboard.presentation){
                resp = dashboard && dashboard.datasource && dashboard.presentation && dashboard.config.valueFields[0];
            }
            else{
                resp = resp && dashboard.config.valueFields[0];
            }

            return resp;
        };

        $scope.getPresentationTranslation = function (presentation) {
            var resp = presentation;

            for(var atr in GRAPH_TYPE){
                if (GRAPH_TYPE[atr][0] === presentation){
                    resp = GRAPH_TYPE[atr][1];
                    break;
                }
            }

            return resp;
        };

        function getDashboards() {
            Dashboard.query(
                function(dashboards) {
                    $scope.dashboards = dashboards;
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

        getDashboards();

        $scope.delete = function(ev, dashboard) {
            var confirm = $mdDialog.confirm()
                .title('Deseja remover o dashboard?')
                .targetEvent(ev)
                .ok('Confirmar')
                .cancel('Cancelar');

            var id = dashboard._id;

            $mdDialog.show(confirm).then(function() {
                Dashboard.delete({id: id},
                    getDashboards,
                    function(erro) {
                        $scope.message = {
                            text: 'Não foi possível remover o dashboard'
                        };
                        console.log(erro);
                    }
                );
            });
        };

        $scope.visualize = function (id) {
            $location.url('/visualization/'+id);
        };
    });