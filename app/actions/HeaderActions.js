var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');

var HeaderActions = {
  toggleInformation: function() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLEHEADER
    });
  }
};


module.exports = HeaderActions;
