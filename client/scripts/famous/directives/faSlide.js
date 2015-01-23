'use strict';
var directivename = 'faSlide';
var angular = require('angular');
module.exports = function(app) {
    // controller
    var controllerDeps = [];
    var controller = function() {

    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = ['$famous', '$timeline'];
    var directive = function($famous, $timeline) {
        return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'faSlideCtrl',
            require: ['^faSlideBox', 'faSlide'],
            scope: true,
            bindToController: true,
            compile: function(element, attrs, transclude) {
                var surface = element.find('fa-surface');

                if(surface.length <= 0) {
                    element[0].innerHTML = '<fa-surface>' + angular.element(element[0]).html() + '</fa-surface>';
                    surface = element.find('fa-surface');
                }
                surface.attr('fa-pipe-to', 'faSlideBoxCtrl.eventHandler');
                surface.attr('fa-z-index', 'faSlideCtrl.getZIndex()');
                element[0].innerHTML = require('./faSlide.html').replace('<ng-transclude></ng-transclude>', element[0].innerHTML);

                return {
                    pre: function($scope, $element, $attr, ctrls) {
                        var faSlideBoxCtrl = ctrls[0];
                        var faSlideCtrl = ctrls[1];
                        faSlideCtrl.currentIndex = faSlideBoxCtrl.slidesCount;
                        faSlideBoxCtrl.slidesCount += 1;

                        if(faSlideBoxCtrl.animated) {
                            faSlideCtrl.translate = $timeline([
                                [-1, [0, 30]],
                                [0, [0, 30]],
                                [10, [-320 * 10, -30 * 10]]
                            ]);

                            faSlideCtrl.scale = $timeline([
                                [-1, [1, 1]],
                                [0, [1, 1]],
                                [10, [0.09, 0.09]]
                            ]);

                            // faSlideCtrl.rotate = $timeline([
                            //     [-1, -Math.PI / 10],
                            //     [0, 0],
                            //     [1, Math.PI / 10]
                            // ]);
                        }
                        faSlideCtrl.getZIndex = function() {
                            return faSlideBoxCtrl.slidesCount - faSlideCtrl.currentIndex;
                        };

                        faSlideCtrl.distance = function() {
                            return faSlideBoxCtrl.distance(faSlideCtrl.currentIndex);
                        };

                    },
                    post: function($scope, $element, $attr) {

                    }
                };
            }
        };
    };

    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
