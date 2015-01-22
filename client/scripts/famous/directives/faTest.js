'use strict';
var directivename = 'faTest';

module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {
        var vm = this;
        vm.value = 0;
        vm.addValue = function() {
            vm.value += 1;
        };
    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = ['$faTestDelegate'];
    var directive = function($faTestDelegate) {
        return {
            restrict: 'AE',
            scope: true,
            controller: controller,
            controllerAs: 'faTestCtrl',
            bindToController: true,
            template: require('./faTest.html'),
            compile: function(scope, element, attrs) {
                return {
                    pre: function($scope, $element, $attr, ctrl) {
                        var deregisterInstance = $faTestDelegate._registerInstance(
                            ctrl, $attr.delegateHandle, ctrl.hasActiveScope
                        );

                        $scope.$on('$destroy', function() {
                            deregisterInstance();
                        });
                    },
                    post: function(scope, element, attrs) {

                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
