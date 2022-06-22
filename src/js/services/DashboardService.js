angular.module('projetocql').factory('Dashboard',
    function($resource, BackEndService,  DataSource, $q) {
        var dash = $resource(BackEndService.getServerAdress()+'/dashboards/:id');

        dash.getDataSourceFilterList = function (id) {
            return $q(function(resolve, reject) {
                dash.get({id: id},
                    function(dashboard) {

                        DataSource.get({id: dashboard.datasource},
                            function(datasource) {
                                resolve(datasource.filters);
                            },
                            function(error) {
                                reject(error);
                            }
                        );
                    },
                    function(error) {
                        reject(error);
                    }
                );
            });
        };

        return dash;
    });