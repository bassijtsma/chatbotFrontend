var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var Api = require('../utils/Api');

var MessageActions = {
  getMessages: function() {
    Api
      .get('/messages/')
      .then(function (messages) {
        console.log('getting messages complete!')
        Dispatcher.dispatch({
          actionType: Constants.MESSAGES_RECEIVED,
          messages: messages.results
        });
      })
      .catch(function (error) {
        console.log('error fetching messages, todo: build dispatching error actiontype');
        console.log(error);
      });
  }
};

module.exports = MessageActions;
