'use strict';
var directivename = 'faPager';
var _ = require('lodash');
module.exports = function(app) {

    // controller
    var controllerDeps = [];
    var controller = function() {

    };
    controller.$inject = controllerDeps;

    // directive
    var directiveDeps = ['$timeline'];
    var directive = function($timeline) {
        return {
            restrict: 'E',
            controller: controller,
            controllerAs: 'faPagerCtrl',
            bindToController: true,
            require: ['^faSlideBox', 'faPager'],
            template: require('./faPager.html'),
            compile: function(scope, element, attrs) {
                return {
                    pre: function($scope, $element, $attr, ctrls) {
                        var faSlideBoxCtrl = ctrls[0];
                        var faPagerCtrl = ctrls[1];

                        faPagerCtrl.numSlides = function() {
                            return new Array(faSlideBoxCtrl.slidesCount);
                        };

                        faPagerCtrl.markerOpacity = $timeline([
                            [-1, 0.3],
                            [0, 1],
                            [1, 0.3]
                        ]);

                        faPagerCtrl.markerScale = $timeline([
                            [-1, [0.6, 0.6]],
                            [0, [1, 1]],
                            [1, [0.6, 0.6]]
                        ]);

                    },
                    post: function($scope, $element, $attr) {}
                };
            }
        };
    };
    directive.$inject = directiveDeps;

    app.directive(directivename, directive);
};
