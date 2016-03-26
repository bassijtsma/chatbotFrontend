/**
 * Overengineered, testing flux pattern.
 * Store and respective action deals with hiding/showing info
 * and  tutorial div.
 */
var Dispatcher = require('../dispatcher/Dispatcher');
var Constants = require('../constants/Constants');
var EventEmitter = require('events').EventEmitter;
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var headerVisibility = false;

var HeaderStore = assign({}, EventEmitter.prototype, {

  getHeaderVisibility: function() {
    return headerVisibility;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
})

Dispatcher.register(function(action){
  switch(action.actionType) {

    case Constants.TOGGLEHEADER:
      headerVisibility = !headerVisibility;
      HeaderStore.emitChange();
      break
    default:
     // no op
  }
})

module.exports = HeaderStore;
