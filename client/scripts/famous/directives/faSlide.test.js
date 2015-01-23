'use strict';

var angular = require('angular-mocks');
var app = require('../')('app');
var directivename = 'faSlide';
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
                this.$templateCache = $injector.get('$templateCache');
                this.$compile = $injector.get('$compile');
                this.$scope = $injector.get('$rootScope').$new();
            }));

            it('should succeed', function() {
                var element = unitHelper.compileDirective.call(this, directivename, '<fa-slide-box><fa-slide></fa-slide></fa-slide-box>fa-slide-box>');
                expect(element.html().trim()).toBeDefined();
            });

        });
    });
});
