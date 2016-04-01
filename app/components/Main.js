var React = require('react');
var Header = require('./Header');
var ConversationItem = require('./ConversationItem');
var ConversationStore = require('../stores/ConversationStore');


convs = [{'name' : 'conv 1', 'id' : '1', 'isEditState': false}, {'name' : 'conver 2', 'id' : '2', 'isEditState': false}];

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

    var ConversationItems = this.state.conversations.map(function(conversation) {
        return <ConversationItem conversationName={conversation.name} conversationId={conversation.id} key={conversation.id} />
    })

    return (
      <div>
        <Header />
        <div className="main-container">
          {ConversationItems}
        </div>
          <p>hi</p>

      </div>
    )
  }
});

module.exports = Main;
