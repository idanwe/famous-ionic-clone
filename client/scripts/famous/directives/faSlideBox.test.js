'use strict';

var angular = require('angular-mocks');
var app = require('../')('app');
var directivename = 'faSlideBox';
var unitHelper = require('unitHelper');

describe(app.name, function() {

    describe('Directives', function() {

        describe(directivename, function() {

            beforeEach(function() {
                angular.mock.module(app.name);
            });

            beforeEach(inject(function($injector) {
                this.$injector = $injector;
                this.$compile = $injector.get('$compile');
                this.$famous = $injector.get('$famous');
                this.$scope = $injector.get('$rootScope').$new();
                // this.element = compileDirective.call(this, '<fa-slide-box>' +
                //     '<fa-slide>' +
                //     '<div class="box blue">' +
                //     '<h1>BLUE {{slideBox.slideIndex}}</h1>' +
                //     '</div>' +
                //     '</fa-slide>' +
                //     '<fa-slide>' +
                //     '<div class="box yellow">' +
                //     '<h1>YELLOW {{slideBox.slideIndex}}</h1>' +
                //     '</div>' +
                //     '</fa-slide>' +
                //     '<fa-slide>' +
                //     '<div class="box pink"><h1>PINK {{slideBox.slideIndex}}</h1></div>' +
                //     '</fa-slide>' +
                //     '</ion-slide-box>');
            }));

            afterEach(function() {
                unitHelper.cleanDocument();
            });

            it('should compile directive', function(done) {
                var element = unitHelper.compileDirective.call(this, directivename, '<fa-scroll-view>' +
                    '<fa-view>' +
                    '<fa-surface fa-size="[300, 100]"></fa-surface>' +
                    '</fa-view>' +
                    '</fa-scroll-view>');

                expect(element.html().trim()).not.toBeNull();
                done();
            });

            it('should compile directive famous', function(done) {
                var element = unitHelper.compileDirectiveFamous.call(this, directivename, '<fa-scroll-view>' +
                    '<fa-view>' +
                    '<fa-surface fa-size="[300, 100]"></fa-surface>' +
                    '</fa-view>' +
                    '</fa-scroll-view>');

                expect(element.html().trim()).not.toBeNull();
                done();
            });

            it('should auto implement the slideBox event pipeline', function() {
                unitHelper.compileDirectiveFamous.call(this, directivename,
                    '<fa-slide-box>' +
                    '<fa-slide>' +
                    '<fa-surface  class="test" fa-size="[300, 100]"></fa-surface>' +
                    '</fa-slide>' +
                    '</fa-slide-box>'
                );
                this.$scope.$apply();

                var scrollView = this.$famous.find('fa-scroll-view')[0].renderNode;
                var surface = this.$famous.find('fa-surface.test')[0].renderNode;

                expect(scrollView._touchCount).toBe(0);
                surface._eventOutput.emit('mousewheel', unitHelper.mockEvent({
                    count: 1
                }));

                expect(scrollView._touchCount).toBe(1);
            });

            it('should work with ng-repeated views', function() {
                unitHelper.compileDirectiveFamous.call(this, directivename,
                    '<fa-slide-box>' +
                    '<fa-slide ng-repeat="view in views">' +
                    '<fa-surface fa-size="[300, 100]"></fa-surface>' +
                    '</fa-slide>' +
                    '</fa-slide-box>', 300, this.$scope
                );

                this.$scope.views = [0, 1];

                var scrollView = this.$famous.find('fa-scroll-view')[0].renderNode;

                // The watcher resolves view sequencing
                expect(scrollView._node).toBeNull();
                this.$scope.$apply();
                expect(scrollView._node.index).toBe(0);
                var results = this.$famous.find('fa-surface');
                expect(results.length).toEqual(this.$scope.views.length);
            });

            it('should replace html with surfaces', function() {
                unitHelper.compileDirectiveFamous.call(this, directivename,
                    '<fa-slide-box>' +
                    '<fa-slide ng-repeat="view in views">' +
                    '<div>surface{{view}}</div>' +
                    '</fa-slide>' +
                    '</fa-slide-box>', 300, this.$scope
                );

                this.$scope.views = [0, 1];

                var scrollView = this.$famous.find('fa-scroll-view')[0].renderNode;

                // The watcher resolves view sequencing
                expect(scrollView._node).toBeNull();
                this.$scope.$apply();
                expect(scrollView._node.index).toBe(0);
                var results = this.$famous.find('fa-surface');
                expect(results.length).toEqual(this.$scope.views.length);
            });

            it('should register with $faSlideBoxDelegate', inject(function($compile, $rootScope, $faSlideBoxDelegate) {

                var deregisterSpy = jasmine.createSpy('deregister');
                spyOn($faSlideBoxDelegate, '_registerInstance').and.callFake(function() {
                    return deregisterSpy;
                });
                unitHelper.compileDirective.call(this, directivename, '<fa-slide-box delegate-handle="superHandle">');

                expect($faSlideBoxDelegate._registerInstance)
                    .toHaveBeenCalledWith(this.controller, 'superHandle');

                expect(deregisterSpy).not.toHaveBeenCalled();
                this.scope.$destroy();
                expect(deregisterSpy).toHaveBeenCalled();
            }));

            it('should show pager when showPager is true', function() {
                this.$scope.showPager = true;
                unitHelper.compileDirectiveFamous.call(this, directivename,
                    '<fa-slide-box show-pager="true">' +
                    '<fa-slide>' +
                    '<div>surface</div>' +
                    '</fa-slide>' +
                    '<fa-slide>' +
                    '<div>surface</div>' +
                    '</fa-slide>' +
                    '</fa-slide-box>', 300
                );
                this.$scope.$apply();
                expect(this.controller.showPager).toBeTruthy();
                expect(this.$famous.find('fa-surface.fapager').length).toBe(2);
            });

            it('should not show pager when showPager is false', function() {
                this.$scope.showPager = true;
                unitHelper.compileDirectiveFamous.call(this, directivename,
                    '<fa-slide-box show-pager="false">' +
                    '<fa-slide>' +
                    '<div>surface</div>' +
                    '</fa-slide>' +
                    '<fa-slide>' +
                    '<div>surface</div>' +
                    '</fa-slide>' +
                    '</fa-slide-box>', 300
                );
                this.$scope.$apply();
                expect(this.controller.showPager).toBeFalsy();
                expect(this.$famous.find('fa-surface.fapager').length).toBe(0);
            });
        });
    });
});
