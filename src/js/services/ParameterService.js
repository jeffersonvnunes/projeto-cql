angular.module('projetocql')
    .factory('Parameter',
    function($resource, $http, BackEndService) {
        return $resource(BackEndService.getServerAdress()+'/parameters/:id');
    });