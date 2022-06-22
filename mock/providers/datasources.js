const casual = require('casual').pt_BR;
const datasources = require('../data/datasources.js');

var datasourcesProvider = {
    datasources: function(){
        return casual.random_element(datasources);
    }
};

module.exports = {
    provider:datasourcesProvider
};