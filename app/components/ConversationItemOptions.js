var React = require('react');
var PropTypes = React.PropTypes;
var ConversationItemActions = require('../actions/ConversationItemActions');
var ConversationStore = require('../stores/ConversationStore');


var ConversationItemOptions = React.createClass({
  render: function() {
    return (
      <div>
        <p className = 'conversation-options' >
          <span onClick = {this._editConversation} >
          {this.props.isEditState
            ? <span onClick = {this.props.updateConversation}>Save </span>
            : 'Edit conversation name'}
          </span> |
          <span onClick = {
            this._toggleDeleteConversationAlert}>
            {this.props.isDeleteState ? 'Cancel' : 'Delete'}
          </span>
        </p>
      </div>
    )
  },

  _editConversation: function() {
    console.log(' edit conv state', this.props.conversationId)
    ConversationItemActions.toggleEditConversation(this.props.conversationId);
  },


  _deleteConversation: function() {
    ConversationItemActions.deleteConversation();
  },
  _toggleDeleteConversationAlert: function() {
    ConversationItemActions.toggleDeleteConversationAlert(this.props.conversationId);
  }
})

module.exports = ConversationItemOptions;
