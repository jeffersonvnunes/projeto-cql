angular.module('projetocql', ['ngRoute','ngResource', 'ngMaterial', 'projetocql.charts', 'gridster'])
    .config(function($routeProvider, $locationProvider) {
        $locationProvider.hashPrefix('');
        $routeProvider.when('/dataservices', {
            templateUrl: '/views/dataservices.html',
            controller: 'DataServicesController'
        }).when('/dataservice/:dataServiceId', {
            templateUrl: 'views/dataservice.html',
            controller: 'DataServiceController'
        }).when('/dataservice', {
            templateUrl: 'views/dataservice.html',
            controller: 'DataServiceController'
        }).when('/parameters', {
            templateUrl: '/views/parameters.html',
            controller: 'ParametersController'
        }).when('/parameter/:parameterId', {
            templateUrl: 'views/parameter.html',
            controller: 'ParameterController'
        }).when('/parameter', {
            templateUrl: 'views/parameter.html',
            controller: 'ParameterController'
        }).when('/datasources', {
            templateUrl: '/views/datasources.html',
            controller: 'DataSourcesController'
        }).when('/datasource/:dataSourceId', {
            templateUrl: 'views/datasource.html',
            controller: 'DataSourceController'
        }).when('/datasource', {
            templateUrl: 'views/datasource.html',
            controller: 'DataSourceController'
        }).when('/dashboards', {
            templateUrl: 'views/dashboards.html',
            controller: 'DashboardsController'
        }).when('/dashboard/:dashboardId', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController'
        }).when('/dashboard/', {
            templateUrl: 'views/dashboard.html',
            controller: 'DashboardController'
        }).when('/visualization/:textId/', {
            templateUrl: 'views/visualization.html',
            controller: 'VisualizationController'
        }).when('/presentations/', {
            templateUrl: 'views/presentations.html',
            controller: 'PresentationsController'
        }).when('/presentation/', {
            templateUrl: 'views/presentation.html',
            controller: 'PresentationController'
        }).when('/presentation/:presentationId/', {
            templateUrl: 'views/presentation.html',
            controller: 'PresentationController'
        }).when('/presentationslide/:presentationId', {
            templateUrl: 'views/presentationslide.html',
            controller: 'PresentationSlideController'
        }).otherwise({redirectTo: '/presentations'});
    });