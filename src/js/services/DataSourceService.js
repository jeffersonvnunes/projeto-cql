angular.module('projetocql')
    .factory('DataSource',
    function($resource, $http, BackEndService) {
        var source = $resource(BackEndService.getServerAdress()+'/datasources/:id');

        source.getData = function (id, filters, request){
            var promise;

            if(request){
                promise = $http.post(BackEndService.getServerAdress()+'/datasources/'+id+'/data', request);
            }else if(filters && filters.length > 0){
                var request = {
                    filters: filters
                };

                promise = $http.post(BackEndService.getServerAdress()+'/datasources/'+id+'/data', request);

            }else{
                promise =  $http.get(BackEndService.getServerAdress()+'/datasources/'+id+'/data');
            }

            return promise;
        };

        return source;
    });