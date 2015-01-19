'use strict';
var directivename = 'faTab';

module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {
        var vm = this;

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
            compile: function(element, attrs) {
                element[0].innerHTML = require('./faTab.html').replace('<ng-transclude></ng-transclude>', element[0].innerHTML);
                return {
                    pre: function(scope, element, attrs, ctrls) {

                    },
                    post: function(scope, element, attrs, ctrls) {

                        var ctrlTabs = ctrls[0];
                        scope.ctrl.tabIndex = ctrlTabs.tabCount;
                        scope.ctrl.transition = ctrlTabs.transition;
                        // scope.ctrl.ctrlSlideBox = ctrlSlideBox;
                        ctrlTabs.tabCount += 1;

                        scope.ctrl.translate = [];
                        scope.ctrl.rotate = [];

                        scope.ctrl.translate.push([scope.ctrl.tabIndex - 1, [window.innerWidth, 0]]);
                        scope.ctrl.translate.push([scope.ctrl.tabIndex, [0, 0]]);
                        scope.ctrl.translate.push([scope.ctrl.tabIndex + 1, [-window.innerWidth, 0]]);

                        scope.ctrl.rotate.push([scope.ctrl.tabIndex - 1, -Math.PI / 10]);
                        scope.ctrl.rotate.push([scope.ctrl.tabIndex, 0]);
                        scope.ctrl.rotate.push([scope.ctrl.tabIndex + 1, Math.PI / 10]);

                        scope.ctrl.translate = $timeline(scope.ctrl.translate);
                        scope.ctrl.rotate = $timeline(scope.ctrl.rotate);

                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
