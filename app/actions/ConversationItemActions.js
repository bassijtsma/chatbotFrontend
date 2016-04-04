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
    .get('/conversations/')
    .then(function(conversations){
      Dispatcher.dispatch({
        actionType: Constants.CONV_RECEIVED,
        conversations: conversations.results
      });
    });
  },
  _setActiveConversation: function(conv_id) {
    Dispatcher.dispatch({
      actionType: Constants.CONV_CLICKED,
      conv_id: conv_id
    });
  }
};

module.exports = ConversationItemActions;
