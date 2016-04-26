var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');
var MessageActions = require('../actions/MessageActions');
var MessageOptions = require('./MessageOptions');

var MessageItem = React.createClass({
  getInitialState: function() {
    return {
      tempMessageText: ''
    }
  },
  componentDidUpdate: function() {

  },

  render: function() {
    var ref = this.props.messageType + this.props.messagenr;
    return (
      <div classname="message">
        <form className="MessageForm" onSubmit={this._onSubmitMessageForm}>
          {this.props.editState
          ?
              <input type='text' className='conversationname-input'
              placeholder= {this.props.text}
              value={this.state.tempMessageText}
              onChange={this._updateTempMessageText}
              ref= {this.focusInputField}
              />
            : <p>{this.props.text} {this.props.m_nr} {this.props.activeConversation}</p> }

          <MessageOptions
              objectId={this.props.objectId}
              msgkey={this.props.msgkey}
              messageType={this.props.messageType}
              editState={this.props.editState}
              deleteState={this.props.deleteState}
              m_nr={this.props.m_nr}
              convId={this.props.activeConversation}
              updateFn={this._updateMessageText} />
        </form>
      </div>
    )
  },

  _updateTempMessageText: function(event) {
    this.setState({
      tempMessageText: event.target.value
    })
  },

  _onSubmitMessageForm: function(event) {
    event.preventDefault();
    event.stopPropagation();
    this._updateMessageText();
  },

  _updateMessageText: function() {

    var requestBody = {
      objectId: this.props.objectId,
      m_nr: this.props.m_nr,
      is_alternative: false,
      conv_id: this.props.activeConversation,
      messageType: this.props.messageType,
      key: this.props.msgkey
    };
    if (this.props.messageType === 'question') {
      requestBody.qtext = this.state.tempMessageText;
      requestBody.rtext = this.props.rtext;
    } else {
      requestBody.rtext = this.state.tempMessageText
      requestBody.qtext = this.props.qtext;
    }
    console.log('update for:', requestBody);
    MessageActions.updateMessage(requestBody);
  },

  focusInputField: function(input) {
    if (this.props.editState) {
      console.log('input:', input)
        if (input != null) {
          input.focus();
      }
    }
  }
})

MessageItem.PropTypes = {
  messagenr: PropTypes.number.isRequired,
  msgkey: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isAlternative: PropTypes.bool.isRequired,
  messageType: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired
}

module.exports = MessageItem;
