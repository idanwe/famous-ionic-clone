'use strict';
var directivename = 'faSlide';

module.exports = function(app) {
    // controller
    var controllerDeps = ['$timeline'];
    var controller = function($timeline) {
        var vm = this;

        vm.distance = function(index) {
            var retVal = vm.ctrlSlideBox.distance(vm.currentIndex);
            return retVal;
        };

    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = ['$famous', '$timeline'];
    var directive = function($famous, $timeline) {
        return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'ctrl',
            require: '^faSlideBox',
            scope: true,
            bindToController: true,
            compile: function(element, attrs, transclude) {

                var surface = element.find('fa-surface');
                surface.attr('fa-pipe-to', 'ctrl.eventHandler');
                element[0].innerHTML = require('./faSlide.html').replace('<ng-transclude></ng-transclude>', element[0].innerHTML);

                return {

                    pre: function(scope, element, attrs) {

                    },
                    post: function(scope, element, attrs, ctrlSlideBox) {

                        scope.ctrl.eventHandler = ctrlSlideBox.eventHandler;
                        scope.ctrl.currentIndex = ctrlSlideBox.slidesCount;
                        scope.ctrl.ctrlSlideBox = ctrlSlideBox;

                        ctrlSlideBox.slidesCount += 1;

                        if(ctrlSlideBox.animated) {
                            scope.ctrl.translate = $timeline([
                                [-1, [50, 100]],
                                [0, [0, 0.8]],
                                [1, [-50, -30]]
                            ]);

                            scope.ctrl.scale = $timeline([
                                [-1, [0.7, 0.7]],
                                [0, [0.8, 0.8]],
                                [1, [0.7, 0.7]]
                            ]);

                            scope.ctrl.rotate = $timeline([
                                [-1, -Math.PI / 10],
                                [0, 0],
                                [1, Math.PI / 10]
                            ]);
                        }
                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
