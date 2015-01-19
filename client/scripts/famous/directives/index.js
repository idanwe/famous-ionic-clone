'use strict';

module.exports = function(app) {
    // inject:start
    require('./faPager')(app);
    require('./faSlide')(app);
    require('./faSlideBox')(app);
    require('./faTab')(app);
    require('./faTabHeader')(app);
    require('./faTabs')(app);
    // inject:end
};