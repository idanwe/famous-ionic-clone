'use strict';
var controllername = 'home';

module.exports = function(app) {
    /*jshint validthis: true */

    var deps = ['$famous'];

    function controller($famous) {
        var vm = this;
        vm.pages = [{
            title: 'page 1',
            color: 'purple'
        }, {
            title: 'page 2',
            color: 'red'
        }, {
            title: 'page 3',
            color: 'green'
        }, {
            title: 'page 4',
            color: 'yellow'
        }];

    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};
