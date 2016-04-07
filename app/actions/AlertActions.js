var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var Api = require('../utils/Api');

var AlertActions = {
  showDeleteMessageAlert: function(objectId) {
    Dispatcher.dispatch({
      actionType: Constants.ALERT_MSGDELETE,
      objectId: objectId
    });
  }
};

module.exports = AlertActions;
