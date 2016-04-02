var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var _conversations = {};

function setConversations(conversations) {
  _conversations = conversations;
}

var ConversationStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAllConversations: function() {
    console.log('get all convs');
    return _conversations;
  },

  createConversation: function() {

  },

  updateConversation: function() {

  },

  deleteConversation: function() {
    // in backend handle also removing the qs and responses
    // in frontend emit to dispatcher, make q and r stores that listen to c has
    // been deleted
  }
})

Dispatcher.register(function(action) {
  switch(action.actionType) {

    case Constants.CONV_CREATE:
      // do create
      ConversationStore.emitChange();
      break;

    case Constants.CONV_DELETE:
      // do delete
      ConversationStore.emitChange();
      break;

    case Constants.CONV_UPDATE:
      ConversationStore.updateConversation;
      console.log('updated convsation');
      ConversationStore.emitChange();
      break;

    case Constants.CONV_RECEIVED:
      setConversations(action.conversations);
      ConversationStore.emitChange();
      console.log('convs received, convs updated, change emitted');
      break;

    default:
      // none
  }
});

window.convy = ConversationStore;
console.log('in convstore:', ConversationStore);
module.exports = ConversationStore;
