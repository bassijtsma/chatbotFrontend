var React = require('react');
var PropTypes = React.PropTypes;
var ConversationItemActions = require('../actions/ConversationItemActions');
var ConversationStore = require('../stores/ConversationStore');

var ConversationItem = React.createClass({

  getInitialState: function() {
    return {
    conversationName: null,
    conversationId: null,
    isEditState: false,
    isActiveConversation: false,
    }
  },

  componentDidMount: function() {
    ConversationStore.addChangeListener(this._onChange);
    this.setState({
      conversationName: this.props.conversationName,
      conversationId: this.props.conversationId,
      isActiveConversation: this._isActiveConversation()
    })
  },

  componentWillUnmount: function() {
    ConversationStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
    <div onClick={this._setActiveConversation} className={this.state.isActiveConversation ? 'activeConv' : 'inactiveConv'}>
      {!this.state.isEditState ? <h2>{this.state.conversationName}</h2> : <h2>edit the conv state</h2>}
      <p>id: {this.state.conversationId}</p>
      <p> <span onClick={this._editConversation}>Edit</span> | <span onClick={this._deleteConversation}>Delete</span></p>
    </div>
    )
  },

  _onChange: function() {
    this.setState({
      conversationName: this.props.conversationName,
      isActiveConversation: this._isActiveConversation()
    })
  },

  _editConversation: function() {
    ConversationItemActions.editConversation();
  },

  _updateConversation: function() {
    ConversationItemActions.updateConversation();
  },

  _deleteConversation: function() {
    ConversationItemActions.deleteConversation();
  },

  _setActiveConversation: function() {
    if (!this._isActiveConversation()) {
      ConversationItemActions._setActiveConversation(this.props.conversationId)
    }
  },

  _isActiveConversation: function() {
    return this.props.conversationId === ConversationStore.getActiveConversation();
  }

})

ConversationItem.PropTypes = {
  conversationName: PropTypes.string,
  conversationId: PropTypes.string
}

module.exports = ConversationItem;
