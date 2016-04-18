var React = require('react');
var PropTypes = React.PropTypes;
var ConversationItemActions = require('../actions/ConversationItemActions');
var ConversationStore = require('../stores/ConversationStore');


var ConversationItemOptions = React.createClass({
  render: function() {
    return (
      <div>
      <p className = 'conversation-options' >
        <span onClick = {
        this._editConversation.bind(this, this.props.conversationId)
        } > {this.props.isEditState ? 'Save' : 'Edit'} </span> |
        <span onClick = {
          this._toggleDeleteConversationAlert.bind(this, this.props.conversationId)}>
          {this.props.isDeleteState ? 'Cancel' : 'Delete'}</span>
          </p>
          </div>
    )
  },

  _editConversation: function(conv_id) {
    ConversationItemActions.editConversation(conv_id);
  },

  _updateConversation: function() {
    ConversationItemActions.updateConversation();
  },

  _deleteConversation: function() {
    ConversationItemActions.deleteConversation();
  },
  _toggleDeleteConversationAlert: function(conv_id) {
    ConversationItemActions.toggleDeleteConversationAlert(conv_id)
  }
})

module.exports = ConversationItemOptions;
