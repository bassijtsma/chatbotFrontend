var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var MessagesAPI = require('../utils/MessagesAPI');

var AlertActions = {
  showDeleteMessageAlert: function(objectId) {
    Dispatcher.dispatch({
      actionType: Constants.ALERT_MSGDELETE,
      objectId: objectId
    });
  },
  confirmDeleteMessageAlert: function(objectId) {
    Dispatcher.dispatch({
      actionType: Constants.ALERT_CONFIRMMSGDELETE
    });
    MessagesAPI.deleteMessage(objectId)
      .then(function(result) {
        Dispatcher.dispatch({
          actionType: Constants.MESSAGE_DELETE_SUCCESS,
          result: result
        });
      })
      .catch(function(result) {
        Dispatcher.dispatch({
          actionType: Constants.MESSAGE_DELETE_FAIL,
          result: result
        });
      })
  }
};

module.exports = AlertActions;
