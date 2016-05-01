var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _statusDialogVisibility = true;
var _statusDialogMessage = '';

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
  }

});

Dispatcher.register(function(action) {
  switch (action.actionType) {

    case Constants.MESSAGE_DELETE_SUCCESS:
      _statusDialogMessage = 'Message deleted successfully!';
      _statusDialogVisibility = true;
      StatusDialogStore.emitChange();
      break;

    case Constants.MESSAGE_DELETE_FAIL:
      _statusDialogMessage = "error: " + action.requestResult.error;
      _statusDialogVisibility = true;
      StatusDialogStore.emitChange();
      break;

    case Constants.MESSAGE_CREATE_SUCCESS:
      _statusDialogMessage = 'Message created successfully!';
      _statusDialogVisibility = true;
      StatusDialogStore.emitChange();
      break;

    case Constants.MESSAGE_CREATE_FAIL:
      _statusDialogMessage = "error: " + action.requestResult.error;
      _statusDialogVisibility = true;
      StatusDialogStore.emitChange();
      break;

    case Constants.MESSAGE_UPDATE_SUCCESS:
      _statusDialogMessage = 'Message updated successfully!';
      _statusDialogVisibility = true;
      StatusDialogStore.emitChange();
      break;

    case Constants.MESSAGES_RECEIVED:
      _statusDialogMessage = 'Messages received succesfully!';
      _statusDialogVisibility = true;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_CREATE_SUCCESS:
      _statusDialogMessage = 'New conversation created successfully!';
      _statusDialogVisibility = true;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_CREATE_FAIL:
      _statusDialogMessage = "error: " + action.requestResult.error;
      _statusDialogVisibility = true;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_DELETE_SUCCESS:
      _statusDialogMessage = 'Conversation deleted successfully!';
      _statusDialogVisibility = true;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_DELETE_FAIL:
      _statusDialogMessage = "error: " + action.requestResult.error;
      _statusDialogVisibility = true;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_UPDATE_SUCCESS:
      _statusDialogMessage = 'Conversation updated successfully!';
      _statusDialogVisibility = true;
      StatusDialogStore.emitChange();
      break;

    case Constants.CONV_UPDATE_FAIL:
      _statusDialogMessage = "error: " + action.requestResult.error;
      _statusDialogVisibility = true;
      StatusDialogStore.emitChange();
      break;


    default:
      // none
  }

  //TODO: maybe after switch statement add timer to hide? hideStatusDialog()

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
