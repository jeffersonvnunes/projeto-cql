module.exports = (function (){
    var cacheManager = {},
        appRoot = require('app-root-path'),
        winston = require(appRoot+'/config/winston');

    cacheManager.dataCache = {};

    cacheManager.addCache = function (datasource, filter, data) {
        var filterText = filter ? filter.map(function(item){
            return item.identifier+ (item.value ? item.value : item.values[0].value);
        }).toString() : '';

        var cache = {
            id: Buffer.from(datasource._id+filterText).toString('base64'),
            filter: filter,
            data: data,
            expiryDate: Date.now() + (datasource.cacheTime ? (datasource.cacheTime * 60000) : (1000*300))
        };
        cacheManager.dataCache[cache.id] = cache;

        return cache;
    };

    cacheManager.getCache = function (datasource, filter){
        var filterText = filter ? filter.map(function(item){
            return item.identifier+ (item.value ? item.value : item.values[0].value);
        }).toString() : '';

        var idCache = Buffer.from(datasource._id+filterText).toString('base64'),
            cache = cacheManager.dataCache[idCache],
            resp = null;

        if(cache){
            resp = cache.data;
        }

        return resp;
    };

    cacheManager.removeCache = function (id, filter, data) {
        var idCache = btoa(JSON.stringify(id)+JSON.stringify(filter)),
            cache = cacheManager.dataCache[idCache];

        if(cache){
            cacheManager.dataCache[idCache] = undefined;
        }

        return cache;
    };

    function clearExpiredSessions (){
        try{
            var now = Date.now(),
                cache, exp;

            for (var id in cacheManager.dataCache){
                if(cacheManager.dataCache.hasOwnProperty(id)){
                    cache = cacheManager.dataCache[id];

                    if(cache && cache.expiryDate){
                        exp = new Date(cache.expiryDate);

                        if( exp.getTime() < now){
                            cacheManager.dataCache[id] = undefined;
                        }
                    }
                }
            }
        }catch (error) {
            winston.error('Clean cache error', error);
        }
    }

    setInterval(clearExpiredSessions, 1000*60);

    return cacheManager;
})();