var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var _messages = [];

function setMessages(messages) {
  _messages = messages;
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
  }

});

Dispatcher.register(function(action) {
  switch (action.actionType) {

    case Constants.MESSAGES_RECEIVED:
      setMessages(action.messages);
      MessageStore.emitChange();
      break;

    default:

  }
})

module.exports = MessageStore;
