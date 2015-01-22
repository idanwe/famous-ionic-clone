'use strict';

var angular = require('angular-mocks');
var app = require('../')('app');
var directivename = 'faSlideBox';
ddescribe(app.name, function() {

    describe('Directives', function() {

        describe(directivename, function() {

            var compileDirective = function(html, height) {
                height = height || 100;
                var element = angular.element('<fa-app style="height: ' + height + 'px">' + html + '</fa-app>');
                var app = this.$compile(element)(this.$scope)[0];
                this.controller = element.controller(directivename);
                this.scope = element.isolateScope() || element.scope();
                document.body.appendChild(app);
                this.$scope.$digest();
                return element;
            };

            var createApp = function(markup, height, scope) {
                height = height || 100;

                var app = $compile(
                    '<fa-app style="height: ' + height + 'px">' +
                    markup +
                    '</fa-app>'
                )(scope || $scope)[0];

                document.body.appendChild(app);
                return app;
            };

            beforeEach(function() {
                angular.mock.module(app.name);
            });

            beforeEach(inject(function($injector) {
                this.$compile = $injector.get('$compile');
                this.$famous = $injector.get('$famous');
                this.$scope = $injector.get('$rootScope').$new();
                this.common = require('../../../../test/unit/helper').famousAngularCommon(this.$scope, this.$compile);
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

            xit('should compile', function() {
                var element = compileDirective.call(this, '<fa-scroll-view>' +
                    '<fa-view>' +
                    '<fa-surface fa-size="[300, 100]"></fa-surface>' +
                    '</fa-view>' +
                    '</fa-scroll-view>');
                expect(element.html().trim()).not.toBeNull();
            });

            xit('should assign an id to fa-scroll-view', function() {
                var id = this.element.find('fa-scroll-view').attr('id');
                expect(id).not.toBeNull();
                expect(id.length).toBe(5);
            });

            it('should implement the Scrollview event pipeline famous', function() {
                var app = this.common.createApp(
                    '<fa-scroll-view fa-pipe-from="eventHandler">' +
                    '<fa-view>' +
                    '<fa-surface fa-pipe-to="eventHandler" fa-size="[undefined, 100]"></fa-surface>' +
                    '</fa-view>' +
                    '</fa-scroll-view>'
                );

                this.$scope.eventHandler = new this.$famous['famous/core/EventHandler']();
                this.$scope.$apply();

                var scrollView = this.$famous.find('fa-scroll-view')[0].renderNode;
                var surface = this.$famous.find('fa-surface')[0].renderNode;

                // We are testing the widget event pipeline, not the rendering behavior of the widget.
                // Emitting a mock mousewheel event on the surface should affect the Scrollview's private _touchCount.
                expect(scrollView._touchCount).toBe(0);
                surface._eventOutput.emit('mousewheel', this.common.mockEvent({
                    count: 1
                }));

                expect(scrollView._touchCount).toBe(1);

                this.common.destroyApp(app);
            });

            it('should  auto implement the slideBox event pipeline', function() {
                var app = this.common.createApp(
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
                surface._eventOutput.emit('mousewheel', this.common.mockEvent({
                    count: 1
                }));

                expect(scrollView._touchCount).toBe(1);

                this.common.destroyApp(app);

            });

            xit('should work with ng-repeated views', function() {
                var app = this.common.createApp(
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

                this.common.destroyApp(app);
            });

            xit('should register with $faSlideBoxDelegate', inject(function($compile, $rootScope, $faSlideBoxDelegate) {

                var deregisterSpy = jasmine.createSpy('deregister');
                spyOn($faSlideBoxDelegate, '_registerInstance').and.callFake(function() {
                    return deregisterSpy;
                });
                var el = compileDirective.call(this, '<fa-slide-box delegate-handle="superHandle">');

                expect($faSlideBoxDelegate._registerInstance)
                    .toHaveBeenCalledWith(el.controller('faSlideBox'), 'superHandle', jasmine.any(Function));

                expect(deregisterSpy).not.toHaveBeenCalled();
                el.scope().$destroy();
                expect(deregisterSpy).toHaveBeenCalled();
            }));
        });
    });
});
