'use strict';
var directivename = 'faTabHeader';

module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {
        var vm = this;
        vm.setActiveTab = function(index) {
            vm.transition.set(index, {
                duration: 200
            });
        };
    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = [];
    var directive = function() {
        return {
            restrict: 'AE',
            controller: controller,
            controllerAs: 'ctrl',
            bindToController: true,
            require: '^faTabs',
            template: require('./faTabHeader.html'),
            compile: function(element, attrs) {
                return {
                    pre: function(scope, element, attrs) {

                    },
                    post: function(scope, element, attrs, ctrlTabs) {
                        scope.ctrl.tabs = ctrlTabs.tabs;
                        scope.ctrl.transition = ctrlTabs.transition;
                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
