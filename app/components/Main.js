var React = require('react');
var Header = require('./Header');
var ConversationSection = require('./ConversationSection');
var ConversationStore = require('./ConversationStore');

var Main = React.createClass({

  getInitialState: function() {
      return {
        conversations: []
      }
  },

  componentDidMount: function() {
    ConversationStore.getAllConversations()
  },

  render: function() {
    return (
      <div>
        <Header />

        <div className='main-container'>

        </div>
      </div>
    )
  }
});

module.exports = Main;
