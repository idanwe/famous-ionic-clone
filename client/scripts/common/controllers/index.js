'use strict';

module.exports = function(app) {
    // inject:start
    require('./home')(app);
    require('./play')(app);
    // inject:end
};