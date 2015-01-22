'use strict';

module.exports = function(app) {
    // inject:start
    require('./home')(app);
    require('./page1')(app);
    require('./page2')(app);
    require('./play')(app);
    require('./tabs')(app);
    // inject:end
};