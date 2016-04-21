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
    Api
    .put('/conversations/' + conv_id)
    .then(function(result) {
      if (result.results === 'TODO') {
        Dispatcher.dispatch({
          actionType: Constants.CONV_UPDATE_SUCCESS,
          conv_id: conv_id,
          newConvName: newConvName
        });
      } else {
        console.log("TODO CON ITEM ACTIONS CONV UPDTATE")
        Dispatcher.dispatch({
          actionType: Constants.CONV_UPDATE_FAIL,
          conv_id: conv_id,
          newConvName: newConvName
        });
        }
      })
      .catch(function(error){
        console.log(error);
        Dispatcher.dispatch({
          actionType: Constants.CONV_UPDATE_FAIL,
          conv_id: conv_id,
          newConvName: newConvName
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
    Dispatcher.dispatch({
      actionType: Constants.CONV_DELETE,
      conv_id: conv_id
    });
    Api
      .delete('/conversations/'+conv_id)
      .then(function(result) {
        console.log('success:', result);
        if(result.results === 'Conversation de  leted successfully') {
          Dispatcher.dispatch({
            actionType: Constants.CONV_DELETE_SUCCESS,
            requestResult: result,
            conv_id: conv_id
          });
        } else {
          console.log('result is not success:', result.results)
          Dispatcher.dispatch({
            actionType: Constants.CONV_DELETE_FAIL,
            requestResult: result,
            conv_id: conv_id
          });
        }
      })
      .catch(function(error) {
        console.log(error);
        Dispatcher.dispatch({
          actionType: Constants.CONV_DELETE_FAIL,
          requestResult: result,
          conv_id: conv_id
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
