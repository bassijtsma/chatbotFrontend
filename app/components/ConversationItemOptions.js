var React = require('react');
var PropTypes = React.PropTypes;
var ConversationItemActions = require('../actions/ConversationItemActions');
var ConversationStore = require('../stores/ConversationStore');


var ConversationItemOptions = React.createClass({
  
  render: function() {
    return (
        <p className = 'conversation-options' >
          {this.props.isDeleteState
            ? null
            : <span onClick = {this._editConversation} >
              {this.props.isEditState
                ? <span onClick = {this.props.updateConversation}>Save |</span>
              : 'Edit | '}
              </span>}
            <span>

            {this.props.isDeleteState
            ? <span>
                <span onClick={this._deleteConversation}>Confirm delete </span>
                 <span onClick={this._toggleDeleteConversationAlert}>| Cancel</span>
               </span>
            : <span onClick={this._toggleDeleteConversationAlert}>Delete</span>}
          </span>
        </p>
    )
  },

  _editConversation: function() {
    ConversationItemActions.toggleEditConversation(this.props.conversationId);
  },

  _deleteConversation: function() {
    ConversationItemActions.deleteConversation(this.props.conversationId);
  },

  _toggleDeleteConversationAlert: function() {
    ConversationItemActions.toggleDeleteConversationAlert(this.props.conversationId);
  }
})

module.exports = ConversationItemOptions;
