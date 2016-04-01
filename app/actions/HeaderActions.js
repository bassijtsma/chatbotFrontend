var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');

var HeaderActions = {
  toggleInformation: function() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLEHEADER
    });
  }
};


module.exports = HeaderActions;
