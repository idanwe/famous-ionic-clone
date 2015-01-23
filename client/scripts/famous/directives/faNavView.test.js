'use strict';

var angular = require('angular-mocks');
var app = require('../')('app');
var directivename = 'faNavView';
var unitHelper = require('unitHelper');
describe(app.name, function() {

    describe('Directives', function() {

        describe(directivename, function() {

            beforeEach(function() {
                angular.mock.module(app.name);
            });

            afterEach(function() {
                unitHelper.cleanDocument();
            });

            beforeEach(inject(function($injector) {
                this.$controller = $injector.get('$controller');
                this.$templateCache = $injector.get('$templateCache');
                this.$compile = $injector.get('$compile');
                this.$scope = $injector.get('$rootScope').$new();
            }));

            it('should succeed', function() {
                this.$scope.myController = angular.noop;
                var element = unitHelper.compileDirective.call(this, directivename, '<fa-nav-view ng-controller="myController"></fa-nav-view>');
                expect(element.html().trim()).toBeDefined();
            });

        });
    });
});
