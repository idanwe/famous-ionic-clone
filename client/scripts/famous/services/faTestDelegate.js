'use strict';
var servicename = '$faTestDelegate';

module.exports = function(app) {

    app.factory(servicename, require('../utils/delegateService')([
        'addValue'
    ]));
};
