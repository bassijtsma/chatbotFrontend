var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var _messages = [];
var _questionsEditState = {};
var _responsesEditState = {};
var _messagesDeleteState = {};
var _highestM_NrForActiveConv = 0;
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
      deleteMessage(action.objectId);
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
      toggleMessageEditState(action.objectId, action.messageType);
      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_UPDATE:

      MessageStore.emitChange();
      break;

    case Constants.MESSAGE_ALERTDELETETOGGLE:
      toggleMessageDeleteState(action.objectId);
      MessageStore.emitChange();
      break;

    case Constants.CONV_CLICKED:
      setHighestM_NrForActiveConv(action.conv_id);
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
    _questionsEditState[message._id] = false;
    _responsesEditState[message._id] = false;
    _messagesDeleteState[message._id] = false;
  });
}

function deleteMessage(objectId) {
  _messages.every(function(msg, index) {
    if (msg._id === objectId) {
      _messages.splice(index, 1);
      delete _questionsEditState.objectId;
      delete _responsesEditState.objectId;
      delete _messagesDeleteState.objectId;
      console.log('msg deleted');
      return false;
    } else {
      return true;
    }
  });
}


function toggleMessageEditState(objectId, messageType) {
  if (messageType === 'question') {
    _questionsEditState[objectId] = !_questionsEditState[objectId];
  } else if (messageType === 'response') {
    _responsesEditState[objectId] = !_responsesEditState[objectId];
  }
}

function toggleMessageDeleteState(objectId) {
  _messagesDeleteState[objectId] = !_messagesDeleteState[objectId];
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
  console.log('the m_nr is now:', message.m_nr);
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


module.exports = MessageStore;
