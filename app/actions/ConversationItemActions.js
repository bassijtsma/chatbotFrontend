var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var Api = require('../utils/Api');

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
  },
  getConversations: function() {
    Api
    .get('/conversations')
    .then(function(conversations){
      Dispatcher.dispatch({
        actionType: Constants.RECEIVED_CONVERSATIONS,
        conversations: conversations
      });
    });
  }
};

module.exports = ConversationItemActions;
