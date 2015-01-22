'use strict';
var servicename = '$faSlideBoxDelegate';

module.exports = function(app) {
    app.factory(servicename, require('../utils/delegateService')([
        'setActivePage'
    ]));
};
