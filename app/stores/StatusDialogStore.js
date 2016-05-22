var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');
var ConversationStore = require('./ConversationStore');

var CHANGE_EVENT = 'change';
var _statusDialogVisibility = true;
var _statusDialogMessage = '';
var _statusLevel = '';
var _statusWarning = 'warning';
var _statusOK = 'ok';


var StatusDialogStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getStatusDialogVisibility: function() {
    return _statusDialogVisibility;
  },

  getStatusDialogMessage: function() {
    return _statusDialogMessage;
  },

  getStatusLevel: function() {
    return _statusLevel;
  }

});

Dispatcher.register(function(action) {
  switch (action.actionType) {

    case Constants.MESSAGE_DELETE_SUCCESS:
      _statusDialogMessage = 'Message deleted successfully!';
      _statusDialogVisibility = true;
      _statusLevel = _statusOK;
      StatusDialogStore.emitChange();
      break;

    case Constants.MESSAGE_DELETE_FAIL:
      _statusDialogMessage = "error: " + action.requestResult.error;
      _statusDialogVisibility = true;
      _statusLevel = _statusWarning;
      StatusDialogStore.emitChange();
      break;

    case Constants.MESSAGE_CREATE_SUCCESS:
      _statusDialogMessage = 'Message created successfully!';
      _statusDialogVisibility = true;
      _statusLevel = _statusOK;
      StatusDialogStore.emitChange();
      break;

    case Constants.MESSAGE_CREATE_FAIL:
      _statusDialogMessage = "error: " + action.requestResult.error;
      _statusDialogVisibility = true;
      _statusLevel = _statusWarning;
      StatusDialogStore.emitChange();
      break;

    case Constants.MESSAGE_UPDATE_SUCCESS:
      _statusDialogMessage = 'Message updated successfully!';
      _statusDialogVisibility = true;
      _statusLevel = _statusOK;
      StatusDialogStore.emitChange();
      break;

    case Constants.MESSAGES_RECEIVED:
      _statusDialogMessage = 'Messages received succesfully!';
      _statusDialogVisibility = false;
      _statusLevel = _statusOK;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_CREATE_SUCCESS:
      _statusDialogMessage = 'New conversation created successfully!';
      _statusDialogVisibility = true;
      _statusLevel = _statusOK;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_CREATE_FAIL:
      _statusDialogMessage = "error: " + action.requestResult.error;
      _statusDialogVisibility = true;
      _statusLevel = _statusWarning;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_DELETE_SUCCESS:
      _statusDialogMessage = 'Conversation deleted successfully!';
      _statusDialogVisibility = true;
      _statusLevel = _statusOK;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_DELETE_FAIL:
      _statusDialogMessage = "error: " + action.requestResult.error;
      _statusDialogVisibility = true;
      _statusLevel = _statusWarning;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_UPDATE_SUCCESS:
      _statusDialogMessage = 'Conversation updated successfully!';
      _statusDialogVisibility = true;
      _statusLevel = _statusOK;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_UPDATE_FAIL:
      _statusDialogMessage = "error: " + action.requestResult.error;
      _statusDialogVisibility = true;
      _statusLevel = _statusWarning;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_CANNOTDELETEEXAMPLE:
      _statusDialogMessage = "Sorry, cannot delete the example!";
      _statusDialogVisibility = true;
      _statusLevel = _statusWarning;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_CANNOTUPDATEEXAMPLE:
      _statusDialogMessage = "Sorry, you cannot modify the example!";
      _statusDialogVisibility = true;
      _statusLevel = _statusWarning;
      StatusDialogStore.emitChange();
      break;


    // OPTIONAL: If the user should not be allowed to remove the example
    // conversation, uncomment this code to show the warning dialog.
    // Turned off for demo purposes
    //
    // case Constants.CONV_CLICKED:
    // var conversations = ConversationStore.getAllConversations();
    // if (action.conv_id == conversations[0]['conv_id']) {
    //   _statusDialogMessage = 'Note: you cannot modify this example';
    //   _statusDialogVisibility = true;
    //   _statusLevel = _statusOK;
    // } else {
    //   _statusDialogVisibility = false;
    // }
    // StatusDialogStore.emitChange();
    // break;

    default:
      // none
  }

});


// not the right way to do it. multiple actions will interfere with one another
// and hide too early. also maybe race condition + dispatching at the same time
function hideStatusDialog() {
  setTimeout(function(){
    _statusDialogMessage = 'hiding!';
    _statusDialogVisibility = false;
    StatusDialogStore.emitChange();
  },3000);

}

module.exports = StatusDialogStore;
