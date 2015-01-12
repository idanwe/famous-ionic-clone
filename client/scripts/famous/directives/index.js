'use strict';

module.exports = function(app) {
    // inject:start
    require('./faPager')(app);
    require('./faSlide')(app);
    require('./faSlideBox')(app);
    // inject:end
};