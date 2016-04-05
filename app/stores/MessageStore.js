var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var _messages = [];
var _messagesEditState = {};

function setMessages(messages) {
  _messages = messages;
}

function setInitialMessageEditState(messages) {
  messages.map(function (message) {
    _messagesEditState[message._id] = false;
  });
}

function setMessageText(message) {

}

function createMessage(conv_id) {

}

function toggleMessageIsAlternative(message) {

}

function deleteMessage(message) {

}

function toggleMessageEditState(objectId) {
  _messages.every(function(msg) {
    console.log(msg, objectId)
    if (msg._id === objectId) {
      console.log('changing the msg state!')
      _messagesEditState[msg._id] = !_messagesEditState[msg._id];
      return false;
    } else {
      return true;
    }
  });
}

var MessageStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllMessages: function() {
    return _messages;
  },

  getMessagesEditState: function() {
    console.log('\n returning msg edit state\n')
    return _messagesEditState;
  }

});

Dispatcher.register(function(action) {
  switch (action.actionType) {

    case Constants.MESSAGES_RECEIVED:
      setMessages(action.messages);
      setInitialMessageEditState(action.messages);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_CREATE:

      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_TOGGLEALTERNATIVE:
      toggleMessageIsAlternative(action.message);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_DELETE:
      deleteMessage(action.message);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_EDIT:
      toggleMessageEditState(action.objectId);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_UPDATE:

      MessageStore.emitChange();
      break;

    default:

  }
})

module.exports = MessageStore;
