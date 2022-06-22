const casual = require('casual').pt_BR;
const datasource = require('../data/datasource_5964ff112deb0f0fd4e31f67.js');

var datasourceProvider = {
    datasource: function(){
        return casual.random_element(datasource);
    }
};

module.exports = {
    provider:datasourceProvider
};