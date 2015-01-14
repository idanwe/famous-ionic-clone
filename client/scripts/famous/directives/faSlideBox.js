'use strict';
var angular = require('angular');
var directivename = 'faSlideBox';
var randomstring = require('randomstring');
module.exports = function(app) {

    // controller
    var controllerDeps = ['$famous', '$timeout', '$attrs', '$scope'];
    var controller = function($famous, $timeout, $attrs, $scope) {
        var vm = this;
        // var GenericSync = $famous['famous/inputs/GenericSync'];
        // var MouseSync = $famous['famous/inputs/MouseSync'];
        // var TouchSync = $famous['famous/inputs/TouchSync'];
        // var ScrollSync = $famous['famous/inputs/ScrollSync'];
        var EventHandler = $famous['famous/core/EventHandler'];

        // GenericSync.register({
        //     'mouse': MouseSync,
        //     'touch': TouchSync,
        //     'scroll': ScrollSync
        // });
        // vm.sync = new GenericSync(['mouse', 'touch'], {
        //     direction: 0
        // });

        vm.eventHandler = new EventHandler();
        //vm.eventHandler.pipe(vm.sync);
        vm.id = randomstring.generate(5);
        vm.slidesCount = 0;

        vm.getSlideboxScrollView = function() {
            if(!vm.slideboxScrollView) {
                vm.slideboxScrollView = $famous.find('fa-scroll-view')[0].renderNode; //famousHelper.getRenderNode(vm.slideboxScrollView, '#slideboxScrollView');
                vm.surface = $famous.find('fa-surface')[0].renderNode;
            }

            return vm.slideboxScrollView;
        };

        vm.scrollViewDistance = function(i, width) {
            var currentIndex = i - vm.getSlideboxScrollView().getAbsolutePosition() / width;
            return currentIndex;
        };

        vm.distance = function(i) {
            var retVal = vm.scrollViewDistance(i, vm.surface && vm.surface.getSize() ? vm.surface.getSize()[0] : window.innerWidth);
            return retVal;
        };

    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = ['$compile', '$famous'];
    var directive = function($compile, $famous) {
        return {
            restrict: 'E',
            scope: true,
            transclude: true,
            controller: controller,
            controllerAs: 'ctrl',
            bindToController: true,
            template: require('./faSlideBox.html'),
            compile: function(element, attrs, transclude) {
                element.find('fa-scroll-view').attr('fa-pipe-from', 'ctrl.eventHandler');
                return {
                    pre: function(scope, element, attrs) {},
                    post: function(scope, element, attrs) {
                        scope.ctrl.animated = scope.$eval(attrs.animated);

                        if(scope.$eval(attrs.showPager) !== false) {
                            var childScope = scope.$new();
                            var pager = angular.element('<fa-pager></fa-pager>');
                            element.append(pager);
                            $compile(pager)(childScope);
                        }
                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
