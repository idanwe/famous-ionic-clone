'use strict';
var directivename = 'faTabs';
var _ = require('lodash');
module.exports = function(app) {

    // controller
    var angular = require('angular');

    var controllerDeps = ['$scope', '$famous'];
    var controller = function($scope, $famous) {
        var vm = this;
        vm.tabCount = 0;

        var Transitionable = $famous['famous/transitions/Transitionable'];
        vm.transition = new Transitionable(0);
    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = [];
    var directive = function() {
        return {
            restrict: 'AE',
            scope: true,
            controller: controller,
            controllerAs: 'ctrl',
            bindToController: true,
            //template: require('./faTabs.html'),
            //transclude: true,
            compile: function(tElement, tAttrs) {

                var tabs = _(tElement.find('fa-tab')).map(function(el) {
                    var title = angular.element(el).attr('title');
                    return {
                        title: title
                    };
                }).value();

                tElement[0].innerHTML = require('./faTabs.html').replace('<ng-transclude></ng-transclude>', tElement[0].innerHTML);
                return {
                    pre: function(scope, element, attrs, ctrl) {
                        ctrl.tabs = tabs;
                        ctrl.currentTab = 0;
                        ctrl.class = attrs.class;

                    },
                    post: function(scope, element, attrs, ctrl) {

                    }
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
