'use strict';

module.exports = function(app) {
    // inject:start
    require('./faNavView')(app);
    require('./faPager')(app);
    require('./faSlide')(app);
    require('./faSlideBox')(app);
    require('./faTab')(app);
    require('./faTabHeader')(app);
    require('./faTabs')(app);
    require('./faTest')(app);
    // inject:end
};