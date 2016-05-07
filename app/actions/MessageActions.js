var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var Api = require('../utils/Api');

var seed = 99999999;
var defaultconvid = 9999999; // set to 1 to disable editing the default convid

var MessageActions = {
  getMessages: function() {
    Api
      .get('/messages/')
      .then(function (messages) {
        console.log('getting messages complete!', messages);
        Dispatcher.dispatch({
          actionType: Constants.MESSAGES_RECEIVED,
          messages: messages.results
        });
      })
      .catch(function (error) {
        console.log('error fetching messages, todo: build dispatching error actiontype');
        console.log(error);
      });
  },
  deleteMessage: function(key, requestBody) {
    if (requestBody.conv_id === defaultconvid) {
      Dispatcher.dispatch({
        actionType: Constants.MESSAGE_CANNOTDELETEEXAMPLE
      });
      return;
    };
    var recoverykey = Date.now() + Math.floor(Math.random() * seed);
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_DELETE,
      key: key,
      recoverykey: recoverykey,
      conv_id: requestBody.conv_id
    });
    console.log('reqkey:' , requestBody.key)
    Api
    .delete('/messages/'+requestBody.conv_id+'/'+requestBody.key)
    .then(function(result) {
      if (result.results === 'Message deleted successfully') {
        Dispatcher.dispatch({
          actionType: Constants.MESSAGE_DELETE_SUCCESS,
          requestResult: result,
          conv_id: requestBody.conv_id,
          recoverykey: recoverykey
        });
      } else {
        Dispatcher.dispatch({
          actionType: Constants.MESSAGE_DELETE_FAIL,
          requestResult: result,
          recoverykey: recoverykey
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      Dispatcher.dispatch({
        actionType: Constants.MESSAGE_DELETE_FAIL,
        recoverykey: key
      });
    });
  },
  toggleDeleteMessageAlert: function(key) {
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_ALERTDELETETOGGLE,
      key: key
    });
  },
  createNewMessage: function(message) {
    if (message.conv_id === defaultconvid) {
      Dispatcher.dispatch({
        actionType: Constants.MESSAGE_CANNOTCREATEEXAMPLE
      });
      return;
    };
    var key = Date.now() + Math.floor(Math.random() * seed);
    message.key = key;
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_CREATE,
      recoverkey: key,
      message: message
    });
    Api
      .post('/messages/', message)
      .then(function(result) {
        if (result.results === 'Message inserted successfully') {
          Dispatcher.dispatch({
            actionType: Constants.MESSAGE_CREATE_SUCCESS,
            requestResult: result,
            conv_id: message.conv_id,
            recoverykey: key
          });
        } else {
          Dispatcher.dispatch({
            actionType: Constants.MESSAGE_CREATE_FAIL,
            requestResult: result,
            conv_id: message.conv_id,
            recoverykey: key
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  editMessage: function(key, messageType) {
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_EDIT,
      key: key,
      messageType: messageType
    });
  },
  updateMessage: function(message) {
    if (message.conv_id === defaultconvid) {
      Dispatcher.dispatch({
        actionType: Constants.MESSAGE_CANNOTUPDATEEXAMPLE
      });
      return;
    };

    var recoverykey = Date.now() + Math.floor(Math.random() * seed);
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_UPDATE,
      message: message,
    });
    Api
    .put('/messages/'+message.conv_id +'/'+ message.key, message)
    .then(function(result) {
      if (result.results === 'Message updated successfully') {
        console.log('success:', result)
        Dispatcher.dispatch({
          actionType: Constants.MESSAGE_UPDATE_SUCCESS,
          message: message,
          recoverykey: recoverykey
        });
      } else {
        console.log('mesage not updated successfully')
        Dispatcher.dispatch({
          actionType: Constants.MESSAGE_UPDATE_FAIL,
          message: message,
          recoverykey: recoverykey
        });
      }
    })
    .catch(function(err) {
      console.log('error:', err)
      Dispatcher.dispatch({
        actionType: Constants.MESSAGE_UPDATE_FAIL,
        message: message,
        recoverykey: recoverykey
      });
    })
  },
  toggleInstructions: function() {
    Dispatcher.dispatch({
      actionType: Constants.TOGGLEINSTRUCTIONS
    })
  },
  toggleMessageIsAlternative: function(message) {
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_TOGGLEALTERNATIVE,
      key: message.key
    })
    MessageActions.updateMessage(message);
  }
};

module.exports = MessageActions;
