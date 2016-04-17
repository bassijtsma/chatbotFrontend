var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


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
  }

});

Dispatcher.register(function(action) {
  switch (action.actionType) {

    case Constants.MESSAGE_DELETE_SUCCESS:
      processDeleteMessageSuccess(action.requestBody);
      StatusDialogStore.emitChange();
      break;

    default:
      // none
  }
});


function processDeleteMessageSuccess(requestResult) {

}

module.exports = StatusDialogStore;
