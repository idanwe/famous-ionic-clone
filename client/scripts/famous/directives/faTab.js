'use strict';
var directivename = 'faTab';

module.exports = function(app) {

    // controller
    var controllerDeps = ['$famous', '$timeout', '$transclude'];
    var controller = function($famous, $timeout, $transclude) {
        var vm = this;

        var Transitionable = $famous['famous/transitions/Transitionable'];
        vm.transition = new Transitionable(0);

        vm.enter = function($done) {
            vm.transition.set(1, {
                    duration: 300
                },
                $done
            );
        };

        vm.leave = function($done) {
            vm.transition.set(0, {
                    duration: 300
                },
                $done
            );
            $timeout($done, 300);
        };

        vm.isTabActive = function() {
            return vm.ctrlTabs.currentTab === vm.tabIndex;
        };

    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = ['$timeline', '$window'];
    var directive = function($timeline, $window) {
        return {
            restrict: 'AE',
            scope: true,
            require: ['^faTabs', 'faTab'],
            controller: controller,
            controllerAs: 'ctrl',
            bindToController: true,
            transclude: true,
            template: require('./faTab.html'),
            compile: function(element, attrs) {
                //element[0].innerHTML = require('./faTab.html').replace('<ng-transclude></ng-transclude>', element[0].innerHTML);
                return {
                    pre: function(scope, element, attrs, ctrls) {

                    },
                    post: function(scope, element, attrs, ctrls) {

                        var ctrlTabs = ctrls[0];
                        scope.ctrl.tabIndex = ctrlTabs.tabCount;
                        scope.ctrl.ctrlTabs = ctrlTabs;
                        ctrlTabs.tabCount += 1;

                        scope.ctrl.translate = $timeline([
                            [0, [window.innerWidth, window.innerWidth]],
                            [1, [0, 0]],
                            [2, [window.innerWidth, window.innerWidth]]
                        ]);

                        scope.ctrl.rotate = $timeline([
                            [0, -Math.PI / 10],
                            [1, 0],
                            [2, Math.PI / 10]
                        ]);
                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
