var React = require('react');
var PropTypes = React.PropTypes;
var ConversationItemActions = require('../actions/ConversationItemActions');
var ConversationStore = require('../stores/ConversationStore');

var ConversationItem = React.createClass({

  getInitialState: function() {
    return {
    conversationName: null,
    conversationId: null,
    isEditState: false
    }
  },

  componentDidMount: function() {
    ConversationStore.addChangeListener(this._onChange);
    this.setState({
      conversationName: this.props.conversationName,
      conversationId: this.props.conversationId,
    })
  },

  componentWillUnmount: function() {
    ConversationStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
    <div>
      {!this.state.isEditState ? <h2>{this.state.conversationName}</h2> : <h2>edit the conv state</h2>}
      <p>id: {this.state.conversationId}</p>
      <p> <span onClick={this._editConversation}>Edit</span> | <span onClick={this._deleteConversation}>Delete</span></p>
    </div>
    )
  },

  _onChange: function() {
    console.log('onChange')
    this.setState({
      conversationName: this.props.conversationName,
      conversationId: this.props.conversationId,
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
  }
})

ConversationItem.PropTypes = {
  conversationName: PropTypes.string,
  conversationId: PropTypes.string
}

module.exports = ConversationItem;
