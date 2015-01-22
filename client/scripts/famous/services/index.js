'use strict';

module.exports = function(app) {
    // inject:start
    require('./faSlideBoxDelegate')(app);
    require('./faTabsDelegate')(app);
    require('./faTestDelegate')(app);
    require('./famousOverrides')(app);
    // inject:end
};
