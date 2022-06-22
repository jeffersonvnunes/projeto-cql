angular.module('projetocql')
    .factory('DataService',
    function($resource, $http, BackEndService) {
        return $resource(BackEndService.getServerAdress()+'/dataservices/:id');
    });