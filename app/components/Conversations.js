var React = require('react');
var PropTypes = React.PropTypes;
var ConversationStore = require('../stores/ConversationStore');
var ConversationItem = require('./ConversationItem');
var ConversationItemActions = require('../actions/ConversationItemActions');
var HeaderStore = require('../stores/HeaderStore');


var Conversations = React.createClass({
  propTypes: {
    conversations: PropTypes.array.isRequired
  },
  
  render: function() {
    var ConversationItems;

    if (this.props.conversations.length > 0) {
      ConversationItems = this.props.conversations.map(function(conversation) {
        return (
          <ConversationItem
            conversationName={conversation.conv_name}
            conversationId={conversation.conv_id}
            key={conversation._id}
            isActiveConversation={ConversationStore.isActiveConversation(conversation.conv_id)}
            isEditState={this.props.conversationsEditState[conversation.conv_id]}
            isDeleteState={this.props.conversationsDeleteState[conversation.conv_id]}
            />
        )
      }.bind(this))
    };

    return(
      <ul className='conversations'>
        {ConversationItems}
      </ul>
    )
  }
})

module.exports = Conversations;
