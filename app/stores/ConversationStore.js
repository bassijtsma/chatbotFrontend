var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var axios = require('axios');

var CHANGE_EVENT = 'change';
var conversations = {};

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
    // async getting convs, is this the right place?
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
      // do update
      ConversationStore.emitChange();
      break;

    default:
      // none
  }
});

module.export = ConversationStore;
