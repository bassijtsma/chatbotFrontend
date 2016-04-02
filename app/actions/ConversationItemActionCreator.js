var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var Api = require('../utils/Api');


var ConversationItemActionCreator = {
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

module.exports = ConversationItemActionCreator;
