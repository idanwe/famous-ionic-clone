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
    var directiveDeps = [];
    var directive = function() {
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
