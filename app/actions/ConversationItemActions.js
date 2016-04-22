var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var Api = require('../utils/Api');

var ConversationItemActions = {
  createConversation: function() {
    Dispatcher.dispatch({
      actionType: Constants.CONV_CREATE
    });
  },
  updateConversation: function(requestBody) {
    var timestamp = Date.now();
    Dispatcher.dispatch({
      actionType: Constants.CONV_UPDATE,
      conv_id: requestBody.conv_id,
      newConvName: requestBody.conv_name,
      recoverykey: timestamp
    });
    Api
    .put('/conversations/' + requestBody.conv_id)
    .then(function(result) {
      if (result.results === 'TODO') {
        Dispatcher.dispatch({
          actionType: Constants.CONV_UPDATE_SUCCESS,
          recoverykey: timestmap
        });
      } else {
        console.log("TODO CON ITEM ACTIONS CONV UPDTATE");
        Dispatcher.dispatch({
          actionType: Constants.CONV_UPDATE_FAIL,
          recoverykey: timestamp
        });
        }
      })
      .catch(function(error){
        console.log(error);
        Dispatcher.dispatch({
          actionType: Constants.CONV_UPDATE_FAIL,
          recoverykey: timestamp
        });
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
  deleteConversation: function(conv_id) {
    var timestamp = Date.now();
    Dispatcher.dispatch({
      actionType: Constants.CONV_DELETE,
      conv_id: conv_id,
      recoverykey: timestamp
    });
    Api
      .delete('/conversations/'+conv_id)
      .then(function(result) {
        console.log('success:', result);
        if(result.results === 'Conversation de  leted successfully') {
          Dispatcher.dispatch({
            actionType: Constants.CONV_DELETE_SUCCESS,
            requestResult: result,
            conv_id: conv_id,
            recoverykey: timestamp
          });
        } else {
          console.log('result is not success:', result.results);
          Dispatcher.dispatch({
            actionType: Constants.CONV_DELETE_FAIL,
            requestResult: result,
            conv_id: conv_id,
            recoverykey: timestamp
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        Dispatcher.dispatch({
          actionType: Constants.CONV_DELETE_FAIL,
          requestResult: result,
          conv_id: conv_id,
          recoverykey: timestamp
        });
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
