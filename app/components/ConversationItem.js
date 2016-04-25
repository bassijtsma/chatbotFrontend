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
      tempConversationName: ''
    }
  },

  render: function() {
    return (
      <li onClick= {this._setActiveConversation}
        className= {this.props.isActiveConversation
          ? 'active conversation-item'
          : 'conversation-item'
        } >

        {!this.props.isEditState
          ? <h2 className='conversation-item-header'>
            {this.props.conversationName}
          </h2>
          : <input type='text' className='conversationname-input'
          placeholder= {this.props.conversationName}
          value={this.state.tempConversationName}
          onChange={this._updateTempConversationName}
          />}

          <ConversationItemOptions
            conversationId={this.props.conversationId}
            isEditState={this.props.isEditState}
            isDeleteState={this.props.isDeleteState}
            updateConversation={this._updateConversationName}
            />
        </li>
      )},

      _onChange: function() {

      },

      _setActiveConversation: function() {
        if (!this.props.isActiveConversation) {
          ConversationItemActions.setActiveConversation(this.props.conversationId)
        }
      },

      _updateTempConversationName: function(event) {
        this.setState({
          tempConversationName: event.target.value
        })
      },

      _updateConversationName: function() {
        var requestBody = {
          conv_name: this.state.tempConversationName,
          conv_id: this.props.conversationId
        };
        ConversationItemActions.updateConversation(requestBody);
      }

  })


  module.exports = ConversationItem;
