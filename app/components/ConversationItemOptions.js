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
          </span>
          <div>
            {this.props.isDeleteState
            ? <span>
                <span onClick={this._deleteConversation}>Confirm delete</span>
                 <span onClick={this._toggleDeleteConversationAlert}>Cancel</span>
               </span>
            : <span onClick={this._toggleDeleteConversationAlert}>Delete</span>}
          </div>
        </p>
      </div>
    )
  },

  _editConversation: function() {
    console.log(' edit conv state', this.props.conversationId)
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
