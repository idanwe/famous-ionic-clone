'use strict';

var angular = require('angular-mocks');
var app = require('../')('app');
var directivename = 'faTab';
var unitHelper = require('unitHelper');
describe(app.name, function() {

    describe('Directives', function() {

        describe(directivename, function() {

            beforeEach(function() {
                angular.mock.module(app.name);
            });

            beforeEach(inject(function($injector) {
                this.$templateCache = $injector.get('$templateCache');
                this.$compile = $injector.get('$compile');
                this.$scope = $injector.get('$rootScope').$new();
                this.$scope.vm = {};
            }));

            it('should succeed', function() {
                var element = unitHelper.compileDirective.call(this, directivename, '<fa-tabs><fa-tab></fa-tab></fa-tabs></fa-tabs>');
                expect(element.html().trim()).toBeDefined();
            });

        });
    });
});
