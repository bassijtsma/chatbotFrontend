var React = require('react');
var Header = require('./Header');
var ConversationItem = require('./ConversationItem');
var ConversationStore = require('../stores/ConversationStore');

var Main = React.createClass({

  getInitialState: function() {
      return {
        conversations: []
      }
  },

  componentDidMount: function() {
    this.setState({
      conversationstwo: ConversationStore.getAllConversations(),
      conversations: [{}, {}] })
  },

  render: function() {
    return (
      <div>
        <Header />

        <div className='main-container'>
          {this.state.conversations.map(function(conversation) {
              return <ConversationItem conversationName={conversation.name} conversationId={conversation.id} />
          })}

        </div>
      </div>
    )
  }
});

module.exports = Main;
