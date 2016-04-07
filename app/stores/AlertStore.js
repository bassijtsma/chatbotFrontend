var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../utils/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');


var CHANGE_EVENT = 'change';
var _deleteMessageAlertVisibility = false;
var _deleteMessageId = null;

var AlertStore = assign({}, EventEmitter.prototype, {
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getDeleteMessageAlertVisibility: function() {
    return _deleteMessageAlertVisibility;
  },

  getDeleteMessageId: function() {
    return _deleteMessageId;
  }
});

Dispatcher.register(function(action) {
  switch (action.actionType) {

    case Constants.ALERT_MSGDELETE:
      setDeleteMessageAlertVisibility(true);
      setDeleteMessageId(action.objectId);
      AlertStore.emitChange();
      break;

    case Constants.ALERT_CONFIRMMSGDELETE:
      setDeleteMessageAlertVisibility(false);
      setDeleteMessageId(null);
      AlertStore.emitChange();
    }
});


function setDeleteMessageAlertVisibility(flag){
  _deleteMessageAlertVisibility = flag;
}

function setDeleteMessageId(objectId) {
  _deleteMessageId = objectId;
}

module.exports = AlertStore;
