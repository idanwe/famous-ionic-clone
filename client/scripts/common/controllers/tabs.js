'use strict';
var controllername = 'tabs';

module.exports = function(app) {
    /*jshint validthis: true */

    var deps = ['$timeline', '$famous', '$window'];

    function controller($timeline, $famous, $window) {
        var vm = this;

        vm.class = 'tabs-royal';

        vm.changeColor = function() {
            vm.class = 'tabs-assertive';
        };
    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};
