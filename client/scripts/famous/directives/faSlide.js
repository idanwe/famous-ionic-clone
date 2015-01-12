'use strict';
var directivename = 'faSlide';

module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {

    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = ['$famous', '$timeout'];
    var directive = function($famous, $timeout) {
        return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'ctrl',
            require: '^faSlideBox',
            bindToController: true,
            compile: function(element, attrs) {
                var surface = element.find('fa-surface');
                surface.attr('fa-pipe-to', 'ctrl.eventHandler');
                return {
                    pre: function() {

                    },
                    post: function(scope, element, attrs, ctrlSlideBox) {
                        scope.ctrl.eventHandler = ctrlSlideBox.eventHandler;
                        ctrlSlideBox.slidesCount += 1;
                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
