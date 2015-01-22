'use strict';
var servicename = 'faTabsDelegate';

module.exports = function(app) {

    app.factory(app.name + '.' + servicename, require('../utils/delegateService')([
        'select',
        'selecteIndex'
    ]));
};
