'use strict';
var controllername = 'play';

module.exports = function(app) {
    /*jshint validthis: true */

    var deps = ['$famous'];

    function controller($famous) {
        var vm = this;
        var EventHandler = $famous['famous/core/EventHandler'];
        vm.eventHandler = new EventHandler();
        vm.message = 'Hello World';
    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};
