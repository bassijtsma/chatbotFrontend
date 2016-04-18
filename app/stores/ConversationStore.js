var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var _conversations = {};
var _activeConversation = 1;
var _conversationsEditState = {};
var _conversationsDeleteState = {};

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
    return _conversations;
  },

  getActiveConversation: function() {
    return _activeConversation;
  },

  getConversationEditState: function() {
    return _conversationsEditState;
  },

  isActiveConversation: function(conv_id) {
    return conv_id === _activeConversation;
  },

  getConversationsDeleteState: function() {
    return _conversationsDeleteState;
  }

});


Dispatcher.register(function(action) {
  switch (action.actionType) {

    case Constants.CONV_CREATE:
      // do create
      ConversationStore.emitChange();
      break;

    case Constants.CONV_TOGGLEEDIT:
      toggleConversationsEditState(action.conv_id);
      ConversationStore.emitChange();
      break;

    case Constants.CONV_DELETE:
      // do delete
      ConversationStore.emitChange();
      break;

    case Constants.CONV_ALERTDELETETOGGLE:
      toggleConversationDeleteState(action.conv_id);
      ConversationStore.emitChange();
      break;


    case Constants.CONV_UPDATE:
      updateConversation(action.conv_id, action.newConvName);
      ConversationStore.emitChange();
      break;

    case Constants.CONV_RECEIVED:
      setConversations(action.conversations);
      setInitialConversationsState(action.conversations);
      ConversationStore.emitChange();
      break;

    case Constants.CONV_CLICKED:
      setActiveConversation(action.conv_id);
      ConversationStore.emitChange();
      break;


    default:
      // none
  }
});


function setConversations(conversations) {
  _conversations = conversations;
}


function setInitialConversationsState(conversations) {
  conversations.map(function (conv) {
    _conversationsEditState[conv.conv_id] = false;
    _conversationsDeleteState[conv.conv_id] = false;
  });
}


function toggleConversationsEditState(conv_id) {
  _conversationsEditState[conv_id] = !_conversationsEditState[conv_id];
}


function setActiveConversation(conv_id) {
  _activeConversation = conv_id;
}


// TODO
function createConversation(conv_id) {
  _conversationsEditState[conv_id] = false;
  _conversationsDeleteState[conv_id] = false;
}


function toggleConversationDeleteState(conv_id) {
  _conversationsDeleteState[conv_id] = !_conversationsDeleteState[conv_id];
}


function updateConversation(conv_id, newConvName) {
  _conversations.every(function(conv) {
    if (conv.conv_id === conv_id) {
      conv.conv_name = newConvName;
      return false;
    } else {
      return true;
    }
  });
}

function deleteConversation() {
  // in backend handle also removing the qs and responses
  // in frontend emit to dispatcher, make q and r stores that listen to c has
  // been deleted
}


module.exports = ConversationStore;
