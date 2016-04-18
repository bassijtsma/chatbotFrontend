var React = require('react');
var PropTypes = React.PropTypes;
var ConversationItemActions = require('../actions/ConversationItemActions');
var ConversationStore = require('../stores/ConversationStore');
var ConversationItemOptions = require('./ConversationItemOptions');

var ConversationItem = React.createClass({
  propTypes: {
    conversationName: PropTypes.string,
    conversationId: PropTypes.number,
    isEditState: PropTypes.bool
  },

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
      <div>
      <li onClick = {this._setActiveConversation}
        className = {this.props.isActiveConversation
          ? 'activeConv conversation-item'
          : 'inactiveConv conversation-item'
        } >

        {!this.props.isEditState
          ? <h2 className = 'conversation-item-header'>
            {this.state.conversationName}
          </h2>
          : <input type="text" className = "conversationname-form"
          placeholder = {this.state.conversationName}/>}

          <ConversationItemOptions
            conversationId={this.props.conversationId}
            isEditState={this.props.isEditState}
            isDeleteState={this.props.isDeleteState}
            />
        </li>
      </div>)
      },

      _onChange: function() {
        this.setState({
          conversationName: this.props.conversationName,
        })
      },

      _setActiveConversation: function() {
        if (!this.props.isActiveConversation) {
          ConversationItemActions.setActiveConversation(this.props.conversationId)
        }
      },

  })


  module.exports = ConversationItem;
