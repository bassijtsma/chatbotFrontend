var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var Api = require('../utils/Api');

var MessageActions = {
  getMessages: function() {
    Api
      .get('/messages/')
      .then(function (messages) {
        console.log('getting messages complete!');
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
    console.log(requestBody);
    var timestamp = Date.now();
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_DELETE,
      objectId: objectId,
      recoverykey: timestamp
    });
    Api
    .delete('/messages/'+requestBody.conv_id+'/'+requestBody.m_nr)
    .then(function(result) {
      if (result.results === 'Message deleted successfully') {
        Dispatcher.dispatch({
          actionType: Constants.MESSAGE_DELETE_SUCCESS,
          requestResult: result,
          conv_id: requestBody.conv_id,
          recoverykey: timestamp
        });
      } else {
        Dispatcher.dispatch({
          actionType: Constants.MESSAGE_DELETE_FAIL,
          requestResult: result,
          recoverykey: timestamp
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      Dispatcher.dispatch({
        actionType: Constants.MESSAGE_DELETE_FAIL,
        recoverykey: timestamp
      });
    });
  },
  toggleDeleteMessageAlert: function(objectId) {
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_ALERTDELETETOGGLE,
      objectId: objectId
    });
  },
  createNewMessage: function(message) {
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_CREATE,
      message: message
    });
    Api
      .post('/messages/', message)
      .then(function(result) {
        if (result.results === 'Message inserted successfully') {
          Dispatcher.dispatch({
            actionType: Constants.MESSAGE_CREATE_SUCCESS,
            requestResult: result,
            conv_id: message.conv_id
          });
        } else {
          Dispatcher.dispatch({
            actionType: Constants.MESSAGE_CREATE_FAIL,
            requestResult: result,
            conv_id: message.conv_id
          });
        }
      })
      .catch(function(err) {
        console.log(err);
      });
  },
  editMessage: function(objectId, messageType) {
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_EDIT,
      objectId: objectId,
      messageType: messageType
    });
  },
  updateMessage: function(message) {
    var timestamp = Date.now();
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_UPDATE,
      message: message,
      recoverykey: timestamp
    });
    Api
    .put('/messages/'+message.conv_id+'/'+message.m_nr, message)
    .then(function(result) {
      if (result.results === 'Message updated successfully') {
        console.log('success:', result)
        Dispatcher.dispatch({
          actionType: Constants.MESSAGE_UPDATE_SUCCESS,
          message: message,
          recoverykey: timestamp
        });
      } else {
        console.log('mesage not updated successfully')
        Dispatcher.dispatch({
          actionType: Constants.MESSAGE_UPDATE_FAIL,
          message: message,
          recoverykey: timestamp
        });
      }
    })
    .catch(function(err) {
      console.log('error:', err)
      Dispatcher.dispatch({
        actionType: Constants.MESSAGE_UPDATE_FAIL,
        message: message,
        recoverykey: timestamp
      });
    })
  }

};

module.exports = MessageActions;
