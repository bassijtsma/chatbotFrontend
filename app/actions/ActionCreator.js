var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var Api = require('../utils/Api');

var ActionCreator = {
  getConversations: function() {
    Api
    .get('url')
    .then(function(conversations){
      Dispatcher.dispatch({
        actionType: Constants.RECEIVED_CONVERSATIONS,
        conversations: conversations
      });
    });
  }
};
