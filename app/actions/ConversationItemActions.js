var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var Api = require('../utils/Api');

var ConversationItemActions = {
  createConversation: function() {
    Dispatcher.dispatch({
      actionType: Constants.CONV_CREATE
    });
  },
  updateConversation: function(conv_id, newConvName) {
    Dispatcher.dispatch({
      actionType: Constants.CONV_UPDATE,
      conv_id: conv_id,
      newConvName: newConvName
    });
  },
  toggleEditConversation: function(conv_id) {
    Dispatcher.dispatch({
      actionType: Constants.CONV_TOGGLEEDIT,
      conv_id: conv_id
    });
  },
  toggleDeleteConversationAlert: function(conv_id) {
    Dispatcher.dispatch({
      actionType: Constants.CONV_ALERTDELETETOGGLE,
      conv_id: conv_id
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
    .then(function(conversations) {
      Dispatcher.dispatch({
        actionType: Constants.CONV_RECEIVED,
        conversations: conversations.results
      });
    })
    .catch(function(error) {
      console.log('error fetching conversations. todo: build dispatch error actiontype');
      console.log(error);
    });
  },
  setActiveConversation: function(conv_id) {
    Dispatcher.dispatch({
      actionType: Constants.CONV_CLICKED,
      conv_id: conv_id
    });
  }
};

module.exports = ConversationItemActions;
