var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');

var ConversationItemActions = {
  updateConversation: function() {
    Dispatcher.dispatch({
      actionType: Constants.CONV_UPDATE
    });
  },
  editConversation: function() {
    Dispatcher.dispatch({
      actionType: Constants.CONV_EDIT
    });
  },
  deleteConversation: function() {
    Dispatcher.dispatch({
      actionType: Constants.CONV_DELETE
    });
  }
};

module.exports = ConversationItemActions;
