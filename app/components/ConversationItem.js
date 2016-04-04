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
    <div onClick={this._setActiveConversation}
      className={this.props.isActiveConversation ? 'activeConv' : 'inactiveConv'}
      style={this.props.isActiveConversation ? {color: 'red'} : null }>
      {!this.props.isEditState
        ? <h2 onClick={this._editConversation.bind(this, this.props.conversationId)}>{this.state.conversationName}</h2>
        : <h2 onClick={this._editConversation.bind(this, this.props.conversationId)}>edit the conv state</h2>
      }
      <p>id: {this.props.conversationId}</p>
      <p>
        <span onClick={this._editConversation.bind(this, this.props.conversationId)}>Edit</span> |
        <span onClick={this._deleteConversation}>Delete</span>
      </p>
    </div>
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
