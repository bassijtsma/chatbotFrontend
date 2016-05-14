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
        <form onSubmit={this.onSubmitMessageForm}>

          <div className={this.props.is_alternative ? "message-header-alternative" : "message-header"}>
            {this.props.messageType === 'question'
              ? <p className="message-header-text">Person says:</p>
              : <p className="message-header-text">Chatbot replies:</p> }
          </div>

          <div className="message-content">
            {this.props.editState
            ?
                <input type='text'
                value={this.state.tempMessageText}
                onChange={this._updateTempMessageText}
                ref= {this.focusInputField}
                className="message-input"
                />
              : <p className="message-text"
                  onClick={this.editMessage.bind(
                  this, this.props.msgkey, this.props.messageType)} >
                  <span dangerouslySetInnerHTML={{__html: this.props.text}}></span>
                </p>}
            </div>

            <div className="message-footer">
              <MessageOptions
                  msgkey={this.props.msgkey}
                  messageType={this.props.messageType}
                  editState={this.props.editState}
                  deleteState={this.props.deleteState}
                  is_alternative={this.props.is_alternative}
                  m_nr={this.props.m_nr}
                  convId={this.props.activeConversation}
                  updateFn={this.onSubmitMessageForm}
                  toggleAltFn={this.toggleIsAlternative}
                  editFn={this.editMessage} />
              </div>

        </form>
    )
  },

  _updateTempMessageText: function(event) {
    this.setState({
      tempMessageText: event.target.value
    })
  },

  onSubmitMessageForm: function(event) {
    event.preventDefault();
    event.stopPropagation();
    this._updateMessageText();
  },

  editMessage: function(msgkey, messageType) {
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

  toggleIsAlternative: function() {
    var message = {
      m_nr: this.props.m_nr,
      is_alternative: !this.props.is_alternative,
      conv_id: this.props.activeConversation,
      messageType: this.props.messageType,
      key: this.props.msgkey,
      qtext : this.props.qtext,
      rtext : this.props.rtext
    };

    MessageActions.toggleMessageIsAlternative(message);
  },

  focusInputField: function(input) {
    if (this.props.editState) {
        if (input != null) {
          input.focus();
      }
    }
  }
})

module.exports = MessageItem;
