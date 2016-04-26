var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var Api = require('../utils/Api');

var seed = 99999999;

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
  deleteMessage: function(objectId, requestBody) {
    var recoverykey = Date.now() + Math.floor(Math.random() * seed);
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_DELETE,
      objectId: objectId,
      recoverykey: recoverykey
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
  toggleDeleteMessageAlert: function(objectId) {
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_ALERTDELETETOGGLE,
      objectId: objectId,
    });
  },
  createNewMessage: function(message) {
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
  editMessage: function(objectId, messageType) {
    var key = Date.now() + Math.floor(Math.random() * seed);
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_EDIT,
      objectId: objectId,
      key: key,
      messageType: messageType
    });
  },
  updateMessage: function(message) {
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
  }

};

module.exports = MessageActions;
