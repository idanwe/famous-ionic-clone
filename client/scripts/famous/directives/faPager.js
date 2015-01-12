'use strict';
var directivename = 'faPager';
var _ = require('lodash');
module.exports = function(app) {

    // controller
    var controllerDeps = ['$timeline'];
    var controller = function($timeline) {

        var vm = this;
        vm.numSlides = function() {
            return new Array(vm.ctrlSlideBox.slidesCount);
        };

        vm.distance = function(index) {
            var retVal = vm.ctrlSlideBox.distance(index);
            return retVal;
        }

        vm.markerOpacity = $timeline([
            [-1, 0.3],
            [0, 1],
            [1, 0.3]
        ]);

        vm.markerScale = $timeline([
            [-1, [0.8, 0.8]],
            [0, [1, 1]],
            [1, [0.8, 0.8]]
        ]);

    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = [];
    var directive = function() {
        return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'ctrl',
            bindToController: true,
            require: '^faSlideBox',
            template: require('./faPager.html'),
            link: function(scope, element, attrs, ctrlSlideBox) {
                scope.ctrl.ctrlSlideBox = ctrlSlideBox;
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
