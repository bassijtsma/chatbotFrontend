var React = require('react');
var Header = require('./Header');
var ConversationStore = require('../stores/ConversationStore');
var Conversations = require('./Conversations');


var Main = React.createClass({

  getInitialState: function() {
    return {
      zehinitstate : null
    }
  },

  componentDidMount: function() {

  },

  render: function() {
    return (
      <div>
        <Header />
        <Conversations />
        <p>hi</p>
      </div>
    )
  },

  _onChange: function() {
    console.log('onChange')
  },

});

module.exports = Main;
