var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var _conversations = [];
var _activeConversation = 1;
var _conversationsEditState = {};
var _conversationsDeleteState = {};
// object to store backup of conversations for rollbacks in case of API failure
var _conversationsBackup = {};

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
  },

  getHigestConvId: function() {
    var highestconv_id = 0;
    _conversations.forEach(function (conv) {
      if (conv.conv_id > highestconv_id) {
        highestconv_id = conv.conv_id
      }
    })
    return highestconv_id;
  }


});


Dispatcher.register(function(action) {
  switch (action.actionType) {

    case Constants.CONV_CREATE:
      createConversation(action.conv);
      ConversationStore.emitChange();
      break;

    case Constants.CONV_TOGGLEEDIT:
      toggleConversationsEditState(action.conv_id);
      ConversationStore.emitChange();
      break;

    case Constants.CONV_DELETE:
      setConversationsBackup(action.recoverykey);
      deleteConversation(action.conv_id);
      resetActiveConversation();
      ConversationStore.emitChange();
      break;

    case Constants.CONV_DELETE_SUCCESS:
      deleteConversationsBackup(action.recoverykey);
      break;

    case Constants.CONV_DELETE_FAIL:
      restoreConversationsBackup(action.recoverykey);
      deleteConversationsBackup(action.recoverykey);
      ConversationStore.emitChange();
      break;

    case Constants.CONV_ALERTDELETETOGGLE:
      toggleConversationDeleteState(action.conv_id);
      ConversationStore.emitChange();
      break;


    case Constants.CONV_UPDATE:
      setConversationsBackup(action.recoverykey);
      updateConversation(action.conv_id, action.newConvName);
      ConversationStore.emitChange();
      break;

    case Constants.CONV_UPDATE_SUCCESS:
      deleteConversationsBackup(action.recoverykey);
      ConversationStore.emitChange();
      break;

    case Constants.CONV_UPDATE_FAIL:
      restoreConversationsBackup(action.recoverykey);
      deleteConversationsBackup(action.recoverykey);
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


function createConversation(conv) {
  _conversations.push(conv);
  _conversationsEditState[conv.conv_id] = false;
  _conversationsDeleteState[conv.conv_id] = false;
}


function toggleConversationDeleteState(conv_id) {
  _conversationsDeleteState[conv_id] = !_conversationsDeleteState[conv_id];
}


function updateConversation(conv_id, newConvName) {
  console.log('beginning iterate _conversations')
  _conversations.every(function(conv) {
    if (conv.conv_id === conv_id) {
      conv.conv_name = newConvName;
      return false;
    } else {
      return true;
    }
  });
}


function setConversationsBackup(recoverykey) {
  // Because JS does weird pointer/value referencing we use json parse/stringify
  // to make a copy. otherwise will simply just reference _conversations
  var backupconv = JSON.parse(JSON.stringify(_conversations))
  _conversationsBackup.recoverykey = backupconv;
}


function deleteConversationsBackup(recoverykey) {
  console.log('deletin conv backup no longer needed')
  delete _conversationsBackup.recoverykey;
}


function restoreConversationsBackup(recoverykey) {
  console.log('restoring backup convs')
  _conversations = _conversationsBackup.recoverykey;
  console.log('convs is now:', _conversations);
}


function deleteConversation(conv_id) {
  _conversations.every(function (conv, index){
    if (conv.conv_id === conv_id) {
      _conversations.splice(index, 1);
      delete _conversationsEditState.conv_id;
      delete _conversationsDeleteState.conv_id;
      return false;
    } else {
      return true;
    }
  });
}


// Used to display the first conversation after a delete
function resetActiveConversation() {
  _activeConversation = _conversations[0].conv_id;
}


module.exports = ConversationStore;
