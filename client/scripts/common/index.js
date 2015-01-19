'use strict';
require('angular-ui-router');

require('famous-angular');

var modulename = 'common';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;
    var famous = require('../famous')(namespace);
    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'famous.angular', famous.name]);
    // inject:folders start
    require('./controllers')(app);
    // inject:folders end

    app.config(['$stateProvider', '$urlRouterProvider',
        function($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('/');
            $stateProvider.state('home', {
                    url: '/',
                    template: require('./views/home.html'),
                    controller: fullname + '.home',
                    controllerAs: 'vm'
                })
                .state('test', {
                    url: '/play',
                    template: require('./views/play.html'),
                    controller: fullname + '.play',
                    controllerAs: 'vm'
                })
                .state('tabs', {
                    url: '/tabs',
                    template: require('./views/tabs.html'),
                    controller: fullname + '.tabs',
                    controllerAs: 'vm'
                });
        }
    ]);

    return app;
};
