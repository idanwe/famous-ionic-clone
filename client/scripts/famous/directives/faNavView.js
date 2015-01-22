'use strict';
var directivename = 'faNavView';

module.exports = function(app) {

    // controller
    var controllerDeps = ['$famous'];
    var controller = function($famous) {
        var vm = this;

        var Easing = $famous['famous/transitions/Easing'];
        var Transform = $famous['famous/core/Transform'];
        var Transitionable = $famous['famous/transitions/Transitionable'];
        var SnapTransition = $famous['famous/transitions/SnapTransition'];
        var SpringTransition = $famous['famous/transitions/SpringTransition'];
        var WallTransition = $famous['famous/transitions/WallTransition'];

        Transitionable.registerMethod('spring', SpringTransition);
        Transitionable.registerMethod('wall', WallTransition);
        Transitionable.registerMethod('snap', SnapTransition);

        vm.getActiveModifier = function() {
            return vm.modifier;
        };

        vm.fadeInLeft = function(callback, curve) {
            var modifier = vm.getActiveModifier();
            curve = curve ? curve : {
                curve: Easing.inOutExpoNorm,
                duration: 1000
            };

            modifier.halt();
            modifier.setTransform(Transform.translate(window.innerWidth, 0, 0));
            modifier.setTransform(Transform.identity, curve, callback);

            modifier.setOpacity(0);
            modifier.setOpacity(1, curve);
        };

        vm.fadeLeft = function(callback, curve) {
            var modifier = vm.getActiveModifier();
            curve = curve ? curve : {
                curve: Easing.inOutExpoNorm,
                duration: 1000
            };

            modifier.halt();
            modifier.setTransform(Transform.translate(-window.innerWidth, 0, 0), curve, callback);
            modifier.setOpacity(0, curve);
        };

        vm.fallBack = function(callback, curve) {
            var modifier = vm.getActiveModifier();
            curve = curve ? curve : {
                method: 'spring',
                period: 1000,
                dampingRatio: 0.5
            };
            modifier.halt();
            //modifier.setOrigin([0, 1]);
            modifier.setTransform(Transform.rotateX(Math.PI * 0.35), curve, callback);

        };
    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = [];
    var directive = function() {
        return {
            restrict: 'AE',
            scope: true,
            transclude: true,
            controller: controller,
            controllerAs: 'faNavViewCtrl',
            bindToController: true,
            require: ['ngController', 'faNavView'],
            template: require('./faNavView.html'),
            compile: function(element, attrs, transclude) {
                return {
                    pre: function($scope, $element, $attr, ctrls) {
                        var viewController = ctrls[0];
                        var faNavViewCtrl = ctrls[1];
                        viewController.enter = function($done) {
                            faNavViewCtrl.fadeInLeft($done);
                        };

                        viewController.leave = function($done) {
                            faNavViewCtrl.fallBack($done);
                        };

                    },
                    post: function(scope, element, attrs, ctrls) {
                        var faNavViewCtrl = ctrls[1];
                        var Scope = element.find('fa-modifier').scope();
                        faNavViewCtrl.modifier = Scope.isolate[Scope.$id].renderNode._object;
                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
