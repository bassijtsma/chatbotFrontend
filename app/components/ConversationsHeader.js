var React = require('react');
var PropTypes = React.PropTypes;
var ConversationItemActions = require('../actions/ConversationItemActions');
var ConversationStore = require('../stores/ConversationStore');


var ConversationsHeader = React.createClass({

  render: function() {
    return (
      <div className='row conversations-header' onClick={this.newConversation}>
            <p className="new-conversation">
              New conversation
              <span className="glyphicon glyphicon-plus" aria-hidden="true" />
            </p>
      </div>
    )
  },


  newConversation: function() {
    var newConvId = ConversationStore.getHigestConvId() + 1;
    var temporaryObjectId = (String(Math.floor(Date.now() / 1000)) + newConvId);
    var newConv = {conv_name: ' ', conv_id: newConvId, _id: temporaryObjectId}
    ConversationItemActions.createConversation(newConv);
  }
})

module.exports = ConversationsHeader;
