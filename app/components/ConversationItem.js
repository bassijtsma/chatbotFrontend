var React = require('react');
var PropTypes = React.PropTypes;
var ConversationItemActions = require('../actions/ConversationItemActions');
var ConversationStore = require('../stores/ConversationStore');


var ConversationItem = React.createClass({

  getInitialState: function() {
    return {
    conversationName: null
    }
  },

  componentDidMount: function() {
    ConversationStore.addChangeListener(this._onChange);
    this.setState({
      conversationName: this.props.conversationName
    })
  },

  componentWillUnmount: function() {
    ConversationStore.removeChangeListener(this._onChange);
  },

  render: function() {
    return (
    <li onClick={this._setActiveConversation}
      className={this.props.isActiveConversation ? 'activeConv conversation-item' : 'inactiveConv conversation-item'} >
      {!this.props.isEditState
        ? <h4 onClick={this._editConversation.bind(this, this.props.conversationId)}>{this.state.conversationName}</h4>
        : <h4>edit the conv state</h4>
      }
      <p>
        <span onClick={this._editConversation.bind(this, this.props.conversationId)}>
        {this.props.isEditState ? 'Save' : 'Edit'}
        </span> |
        <span onClick={this._deleteConversation}>Delete</span>
      </p>
    </li>
    )
  },

  _onChange: function() {
    this.setState({
      conversationName: this.props.conversationName,
    })
  },

  _editConversation: function(conv_id) {
    {/*magic in edit onClick: a function reference should be passed, otherwise
      it will call it directly. ref passed with .bind*/}
    ConversationItemActions.editConversation(conv_id);
  },

  _updateConversation: function() {
    ConversationItemActions.updateConversation();
  },

  _deleteConversation: function() {
    ConversationItemActions.deleteConversation();
  },

  _setActiveConversation: function() {
    if (!this.props.isActiveConversation) {
      ConversationItemActions._setActiveConversation(this.props.conversationId)
    }
  },

})

ConversationItem.PropTypes = {
  conversationName: PropTypes.string,
  conversationId: PropTypes.string,
  isEditState: PropTypes.bool
}

module.exports = ConversationItem;
