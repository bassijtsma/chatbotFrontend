var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ConversationStore = require('./ConversationStore');

var CHANGE_EVENT = 'change';
var _messages = [];
var _questionsEditState = {};
var _responsesEditState = {};
var _messagesDeleteState = {};
var _highestM_NrForActiveConv = 0;
var _noMessagesWarningVisibility = false;
var instructionsVisibility = true;
// object to store backup of msgs for rollbacks in case of API failure
var _messagesBackup = {};

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

  getInstructionsVisibility: function() {
    return instructionsVisibility;
  },

  getAllMessages: function() {
    return _messages;
  },

  getQuestionsEditState: function() {
    return _questionsEditState;
  },

  getResponsesEditState: function() {
    return _responsesEditState;
  },

  getMessagesDeleteState: function() {
    return _messagesDeleteState;
  },
  getHighestM_NrForActiveConv: function() {
    return _highestM_NrForActiveConv;
  },

  geNoMessagesWarningVisibility: function() {
    return _noMessagesWarningVisibility;
  }

});

Dispatcher.register(function(action) {
  switch (action.actionType) {

    case Constants.MESSAGES_RECEIVED:
      setMessages(action.messages);
      setInitialMessagesState(action.messages);
      setHighestM_NrForActiveConv(1); // default on first load
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_CREATE:
      setMessagesBackup(action.recoverykey);
      createNewMessage(action.message);
      setNoMsgWarningVisibility(action.message.conv_id);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_CREATE_SUCCESS:
      deleteMessagesBackup(action.recoverykey);
      break;

    case Constants.MESSAGE_CREATE_FAIL:
      restoreMessagesBackup(action.recoverykey);
      deleteMessagesBackup(action.recoverykey);
      break;

    case Constants.MESSAGE_TOGGLEALTERNATIVE:
      toggleMessageIsAlternative(action.message);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_DELETE:
      setMessagesBackup(action.recoverykey);
      deleteMessage(action.key);
      setNoMsgWarningVisibility(action.conv_id)
      MessageStore.emitChange();
      break;

    case Constants.CONV_DELETE :
      deleteAllMessagesForConv(action.conv_id);
      var defaultconvid = ConversationStore.getAllConversations()[0].conv_id;
      setNoMsgWarningVisibility(defaultconvid);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_DELETE_SUCCESS:
      deleteMessagesBackup(action.recoverykey);
      break;

    case Constants.MESSAGE_DELETE_FAIL:
      restoreMessagesBackup(action.recoverykey);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_EDIT:
    console.log(action.key)
      toggleMessageEditState(action.key, action.messageType);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_UPDATE:
      setMessagesBackup(action.recoverykey);
      updateMessageText(action.message);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_UPDATE_SUCCESS:
      deleteMessagesBackup(action.recoverykey);
      break;

    case Constants.MESSAGE_UPDATE_FAIL:
      restoreMessagesBackup(action.recoverykey);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_ALERTDELETETOGGLE:
      toggleMessageDeleteState(action.key);
      MessageStore.emitChange();
      break;

    case Constants.CONV_CLICKED:
      setHighestM_NrForActiveConv(action.conv_id);
      setNoMsgWarningVisibility(action.conv_id);
      MessageStore.emitChange();
      break;

    case Constants.CONV_CREATE:
      setNoMsgWarningVisibility(action.conv.conv_id);
      MessageStore.emitChange();
      break;

    case Constants.TOGGLEINSTRUCTIONS:
      instructionsVisibility = !instructionsVisibility;
      MessageStore.emitChange();
      break;

    default:

  }
});


function setMessages(messages) {
  _messages = messages;
}

function setInitialMessagesState(messages) {
  messages.map(function (message) {
    _questionsEditState[message.key] = false;
    _responsesEditState[message.key] = false;
    _messagesDeleteState[message.key] = false;
  });
}

function deleteMessage(key) {
  console.log('the key:', key)
  _messages.every(function(msg, index) {
    if (msg.key === key) {
      _messages.splice(index, 1);
      delete _questionsEditState.key;
      delete _responsesEditState.key;
      delete _messagesDeleteState.key;
      console.log('msg deleted');
      return false;
    } else {
      return true;
    }
  });
}


function toggleMessageEditState(key, messageType) {
  if (messageType === 'question') {
    _questionsEditState[key] = !_questionsEditState[key];
  } else if (messageType === 'response') {
    _responsesEditState[key] = !_responsesEditState[key];
  }
}


function toggleMessageDeleteState(key) {
  _messagesDeleteState[key] = !_messagesDeleteState[key];
}


function setHighestM_NrForActiveConv(activeConvId) {
  highestM_NrForActiveConv = 0;
  _messages.forEach(function (message) {
    if (message.conv_id === activeConvId) {
      if (message.m_nr > highestM_NrForActiveConv) {
        highestM_NrForActiveConv = message.m_nr;
      }
    }
  });
  _highestM_NrForActiveConv = highestM_NrForActiveConv;
}

// When a user creates a new message, it is added 'temporarily' so that the
// action appears instant. In the background, the new msg is is added to the db.
// When successfull, we fetch the newly created message's objectId, and update
// it in all necessary places. Feels dangerous but makes it look instanteneous
function createNewMessage(message) {
  _messages.push(message);
  _highestM_NrForActiveConv = message.m_nr;
}



function setMessagesBackup(recoverykey) {
  // Because JS does weird pointer/value referencing we use json parse/stringify
  // to make a copy. otherwise will simply just reference _messages
  var backupmsgs = JSON.parse(JSON.stringify(_messages))
  _messagesBackup.recoverykey = backupmsgs;
}


function deleteMessagesBackup(recoverykey) {
  delete _messagesBackup.recoverykey;
}


function restoreMessagesBackup(recoverykey) {
  _messages = _messagesBackup.recoverykey;
}

function deleteAllMessagesForConv(conv_id) {
  var newMessages = [];
  _messages.forEach(function(message) {
    if (message.conv_id !== conv_id) {
      newMessages.push(message);
    }
  })
  _messages = newMessages;
}

function updateMessageText(message) {
  var newMessage = message;
  _messages.every(function(msg, index) {
    if (msg.key === message.key) {
      _messages[index].qtext = message.qtext;
      _messages[index].rtext = message.rtext;
      if (message.messageType === 'question') {
        _questionsEditState[message.key] = false;
      } else if (message.messageType === 'response') {
        _responsesEditState[message.key] = false;
      } else {
        console.log('failed to specify msgtype in updateMessageText');
      }
      return false;
    } else {
      return true;
    }
  })
}

// If more than 1 message is visible, the "no msg" warning should not be shown
function shouldShowNoMessageWarning(conv_id) {
  var shouldShowWarning = true;
  _messages.every(function(msg) {
    if (msg.conv_id === conv_id) {
      shouldShowWarning = false;
      return false;
    } return true;
  })
  return shouldShowWarning;
}

function setNoMsgWarningVisibility(conv_id){
  console.log('set no msg warnign visib', conv_id)
  if (shouldShowNoMessageWarning(conv_id)) {
    _noMessagesWarningVisibility = true;
  } else {
    _noMessagesWarningVisibility = false;
  }
}

module.exports = MessageStore;
