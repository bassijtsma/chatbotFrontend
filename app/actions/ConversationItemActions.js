var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');

var ConversationItemActions = {
  updateConversation: function() {
    Dispatcher.dispatch({
      actionType: Constants.CONV_UPDATE
    });
  },
  deleteConversation: function() {
    Dispatcher.dispatch({
      actionType: Constants.CONV_DELETE
    });
  }
};

module.exports = ConversationItemActions;
