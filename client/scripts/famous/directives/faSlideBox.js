'use strict';
var angular = require('angular');
var directivename = 'faSlideBox';
var randomstring = require('randomstring');
module.exports = function(app) {

    // controller
    var controllerDeps = ['$famous', '$timeout', '$attrs', '$scope'];
    var controller = function($famous, $timeout, $attrs, $scope) {
        var vm = this;
        var EventHandler = $famous['famous/core/EventHandler'];
        vm.eventHandler = new EventHandler();



        //vm.id = 'scrollview_' + randomstring.generate(5);
        vm.slidesCount = 0;

        // var getSlideboxScrollView = function() {
        //     if(!vm.slideboxScrollView) {
        //         vm.slideboxScrollView = $famous.find('#' + vm.id)[0].renderNode;
        //     }
        //     return vm.slideboxScrollView;
        // };

        var getScrollLength = function() {
            if(vm.slideboxScrollView) {
                return vm.slideboxScrollView._scroller._contextSize[vm.slideboxScrollView.options.direction || 0];
            }
            return window.innerWidth;
        };

        vm.distance = function(i) {
            var retVal = 0;
            //var scrollview = getSlideboxScrollView();
            if(vm.slideboxScrollView) {
                var length = getScrollLength();
                retVal = i - vm.slideboxScrollView.getAbsolutePosition() / length;
            }
            return retVal;
        };

        vm.setActivePage = function(index) {
            vm.slideboxScrollView.goToPage(index);
        };

    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = ['$faSlideBoxDelegate'];
    var directive = function($faSlideBoxDelegate) {
        return {
            restrict: 'E',
            scope: true,
            transclude: true,
            controller: controller,
            controllerAs: 'faSlideBoxCtrl',
            bindToController: true,
            template: require('./faSlideBox.html'),
            compile: function(element, attrs, transclude) {
                element.find('fa-scroll-view').attr('fa-pipe-from', 'faSlideBoxCtrl.eventHandler');
                return {
                    pre: function($scope, $element, $attr, faSlideBoxCtrl) {
                        $scope.$watch(function() {
                            return $scope.$eval(attrs.animated);
                        }, function(newvalue) {
                            faSlideBoxCtrl.animated = newvalue;
                        });

                        $scope.$watch(function() {
                            return $scope.$eval(attrs.showPager);
                        }, function(newvalue) {
                            faSlideBoxCtrl.showPager = newvalue;
                        });

                        var deregisterInstance = $faSlideBoxDelegate._registerInstance(
                            faSlideBoxCtrl, $attr.delegateHandle
                        );

                        $scope.$on('$destroy', function() {
                            deregisterInstance();
                        });
                    },
                    post: function(scope, element, attrs, faSlideBoxCtrl) {
                        var scrollviewScope = element.find('fa-scroll-view').scope();
                        faSlideBoxCtrl.slideboxScrollView = scrollviewScope.isolate[scrollviewScope.$id].renderNode;
                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
