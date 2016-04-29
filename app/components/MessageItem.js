var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');
var MessageActions = require('../actions/MessageActions');
var MessageOptions = require('./MessageOptions');

var MessageItem = React.createClass({
  PropTypes: {
    messagenr: PropTypes.number.isRequired,
    msgkey: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    isAlternative: PropTypes.bool.isRequired,
    messageType: PropTypes.string.isRequired,
  },

  getInitialState: function() {
    return {
      tempMessageText: this.props.text
    }
  },

  render: function() {
    var ref = this.props.messageType + this.props.messagenr;
    return (
        <form className="message-form" onSubmit={this._onSubmitMessageForm}>

          <div className="message-header">
            {this.props.messageType === 'question'
              ? 'Person says...'
              : 'Chatbot replies...'}
          </div>


          <div className="message-content" onClick={this._editMessage.bind(
              this, this.props.msgkey, this.props.messageType)}>
            {this.props.editState
            ?
                <input type='text' className='conversationname-input'
                value={this.state.tempMessageText}
                onChange={this._updateTempMessageText}
                ref= {this.focusInputField}
                className="messagetext"
                />
              : <p className="messagetext">{this.props.text}</p> }
            </div>

            <div className="message-footer">
              <MessageOptions
                  msgkey={this.props.msgkey}
                  messageType={this.props.messageType}
                  editState={this.props.editState}
                  deleteState={this.props.deleteState}
                  m_nr={this.props.m_nr}
                  convId={this.props.activeConversation}
                  updateFn={this._onSubmitMessageForm}
                  editFn={this._editMessage} />
              </div>

        </form>
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

  _editMessage: function(msgkey, messageType) {
    console.log('editmsg:', msgkey);
    MessageActions.editMessage(msgkey, messageType);
  },


  _updateMessageText: function() {

    var requestBody = {
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

module.exports = MessageItem;
