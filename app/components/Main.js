var React = require('react');
var Header = require('./Header');
var ConversationItem = require('./ConversationItem');
var ConversationStore = require('../stores/ConversationStore');

window.ConversationStore = ConversationStore;

convs = [{'name' : 'conv 1', 'id' : '1'}, {'name' : 'conver 2', 'id' : '2'}];

var Main = React.createClass({

  getInitialState: function() {
      return {
        conversations: []
      }
  },

  componentDidMount: function() {
    this.setState({
      conversations: convs
    })
  },

  render: function() {
    console.log(this.state.conversations);

    var convies = this.state.conversations.map(function(conversation) {
        return <ConversationItem conversationName={conversation.name} conversationId={conversation.id} key={conversation.id} />
    })

    return (
      <div>
        <Header />
          <p>hi</p>
          {convies}
      </div>
    )
  }
});

module.exports = Main;
