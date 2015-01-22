'use strict';
var controllername = 'home';

module.exports = function(app) {
    /*jshint validthis: true */

    var _ = require('lodash');
    var deps = ['$faSlideBoxDelegate'];

    function controller($faSlideBoxDelegate) {
        var vm = this;
        vm.pages = _.map(_.range(3), function(i) {
            return {
                title: 'page ' + i
            };
        });

        vm.showPager = true;
        vm.animated = false;

        vm.setActivePage = function() {
            $faSlideBoxDelegate.setActivePage(2);
        };

        vm.addPage = function() {
            vm.pages.push({
                title: 'page ' + vm.pages.length
            });
        };

    }

    controller.$inject = deps;
    app.controller(app.name + '.' + controllername, controller);
};
