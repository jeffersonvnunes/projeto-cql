const casual = require('casual').pt_BR;
const dashboard = require('../data/dashboards_5965224f9f048717c43df9c0.js');

var dashboardProvider = {
    dashboard: function(){
        return casual.random_element(dashboard);
    }
};

module.exports = {
    provider:dashboardProvider
};