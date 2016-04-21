var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';
var _statusDialogVisibility = false;
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
       // TODO: built timer to show/hide and dispatch show/hide?
      processDeleteMessageSuccess(action.requestBody);
      StatusDialogStore.emitChange();
      break;

    default:
      // none
  }

  //TODO: maybe after switch statement, add the timer and set it to false?

});


function processDeleteMessageSuccess(requestResult) {
  // TODO: display requestResult body probbably
  _statusDialogMessage = 'Message deleted successfully';
  _statusDialogVisibility = true;
}

module.exports = StatusDialogStore;
