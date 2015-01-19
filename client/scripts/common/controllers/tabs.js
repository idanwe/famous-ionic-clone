'use strict';
var controllername = 'tabs';

module.exports = function(app) {
    /*jshint validthis: true */

    var deps = ['$timeline', '$famous', '$window'];

    function controller($timeline, $famous, $window) {
        var vm = this;

        var Transitionable = $famous['famous/transitions/Transitionable'];

        vm.transition = new Transitionable(0);

        vm.setActiveTab = function(value) {
            vm.transition.set(value, {
                duration: 300
            });
        };

        var innerWidth = $window.innerWidth;

        vm.translate1 = $timeline([
            [0, [0, 0]],
            [1, [-innerWidth, 0]],
            [2, [-innerWidth, 0]]
        ]);

        vm.translate2 = $timeline([
            [0, [innerWidth, 0]],
            [1, [0, 0]],
            [2, [-innerWidth, 0]]
        ]);

        vm.translate3 = $timeline([
            [0, [innerWidth, 0]],
            [1, [innerWidth, 0]],
            [2, [0, 0]]
        ]);
    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};
