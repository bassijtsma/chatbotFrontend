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
  },
  editMessage: function(objectId, messageType) {
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_EDIT,
      objectId: objectId,
      messageType: messageType
    });
  },
  deleteMessage: function(objectId, requestBody) {
    console.log(requestBody)
    Dispatcher.dispatch({
      actionType: Constants.MESSAGE_DELETE,
      objectId: objectId
    })
    Api
    .delete('/messages/'+requestBody.conv_id+'/'+requestBody.m_nr)
    .then(function(result) {
      if (result.results === 'Message deleted successfully') {
        Dispatcher.dispatch({
          actionType: Constants.MESSAGE_DELETE_SUCCESS,
          requestResult: result,
          conv_id: requestBody.conv_id
        });
      } else {
        Dispatcher.dispatch({
          actionType: Constants.MESSAGE_DELETE_FAIL,
          requestResult: result,
          conv_id: requestBody.conv_id,
          objectId: objectId
        });
      }
    })
    .catch(function (error) {
      console.log(error);
      Dispatcher.dispatch({
        actionType: Constants.MESSAGE_DELETE_FAIL,
        requestResult: result,
        conv_id: requestBody.conv_id
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
        console.log(err)
      })
  }
};

module.exports = MessageActions;
