var React = require('react');
var ConversationStore = require('../stores/ConversationStore');
var ConversationItem = require('./ConversationItem');
var ConversationItemActions = require('../actions/ConversationItemActions');
var HeaderStore = require('../stores/HeaderStore');


var Conversations = React.createClass({
  getInitialState: function() {
    return null;
  },

  componentDidMount: function() {
    ConversationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    ConversationStore.removeChangeListener(this._onChange);
  },

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
      <div className="col-xs-4">
        {ConversationItems}
      </div>
    )

  },

  _onChange: function() {
    console.log('change logged in Conversations component!')
  }

})

module.exports = Conversations;
