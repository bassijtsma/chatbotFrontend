var React = require('react');
var PropTypes = React.PropTypes;
var ConversationStore = require('../stores/ConversationStore');
var ConversationItem = require('./ConversationItem');
var ConversationItemActions = require('../actions/ConversationItemActions');
var HeaderStore = require('../stores/HeaderStore');


var Conversations = React.createClass({

  render: function() {
    var ConversationItems;

    if (this.props.conversations.length > 0) {
      console.log('Multiple convs, render ConversationItems',
                  this.props.conversations)
      ConversationItems = this.props.conversations.map(function(conversation) {
        return (
          <ConversationItem
            conversationName={conversation.conv_name}
            conversationId={conversation.conv_id}
            key={conversation._id}
            isActiveConversation={ConversationStore.isActiveConversation(conversation.conv_id)}
            isEditState={ConversationStore.getConversationEditState(conversation.conv_id)}/>
        )
      })
    };

    return(
      <div>
        {ConversationItems}
      </div>
    )
  }
})

Conversations.PropTypes = {
  conversations: PropTypes.array.isRequired
}

module.exports = Conversations;
