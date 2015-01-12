'use strict';
require('angular-ui-router');

require('famous-angular');

var modulename = 'famous';

module.exports = function(namespace) {

    var fullname = namespace + '.' + modulename;

    var angular = require('angular');
    var app = angular.module(fullname, ['ui.router', 'famous.angular']);
    // inject:folders start
    require('./directives')(app);
    require('./services')(app);
    // inject:folders end

    app.run([fullname + '.famousOverrides',
        function(famousOverrides) {
            famousOverrides.apply();
        }
    ]);
    return app;

};
