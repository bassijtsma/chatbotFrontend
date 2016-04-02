var React = require('react');
var ConversationStore = require('../stores/ConversationStore');
var ConversationItem = require('./ConversationItem');
var ConversationItemActions = require('../actions/ConversationItemActions');
var HeaderStore = require('../stores/HeaderStore');


var Conversations = React.createClass({
  getInitialState: function() {
    return {
      conversations : []
    }
  },

  componentDidMount: function() {
    ConversationStore.addChangeListener(this._onChange);
    ConversationItemActions.getConversations();
  },

  componentWillUnmount: function() {
    ConversationStore.removeChangeListener(this._onChange);
  },

  render: function() {
    console.log('is it this?', this.state.conversations);

    var ConversationItems;

    if (this.state.conversations.length > 0) {
      console.log('it is this.',  this.state.conversations)
      ConversationItems = this.state.conversations.map(function(conversation) {
        return (
          <ConversationItem
            conversationName={conversation.conv_name}
            conversationId={conversation._id}
            key={conversation._id} />
        )
      })
    };

    return(
      <div className="main-container">
        in conversationscomponent
        {ConversationItems}
      </div>
    )

  },

  _onChange: function() {
    this.setState({
      conversations: ConversationStore.getAllConversations()
    })
  }

})

module.exports = Conversations;
