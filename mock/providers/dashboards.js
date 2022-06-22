const casual = require('casual').pt_BR;
const dashboards = require('../data/dashboards.js');

var dashboardsProvider = {
    dashboards: function(){
        return casual.random_element(dashboards);
    }
};

module.exports = {
    provider:dashboardsProvider
};