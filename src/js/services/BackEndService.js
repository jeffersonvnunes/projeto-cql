angular.module('projetocql')
    .constant('BACK_ADRESS',{
        protocol: 'http',
        host: 'localhost',
        port: '4000'
    })
    .factory('BackEndService',
        function(BACK_ADRESS) {
            var service = this;

            service.getServerAdress = function () {
                var adress = '';

                adress = BACK_ADRESS.protocol+'://'+BACK_ADRESS.host;

                adress += BACK_ADRESS.port ? ':'+BACK_ADRESS.port : '';

                return adress;
            };

            return service
    });