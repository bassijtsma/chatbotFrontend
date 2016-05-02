var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');
var MessageItem = require('./MessageItem');
var MessageOptions = require('./MessageOptions');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var Messages = React.createClass({

  propTypes: {
    activeConversation: PropTypes.number.isRequired,
    messages: PropTypes.array.isRequired
  },

  render: function() {
    var messageItems = this.props.messages.map(function (message) {
      if (message.conv_id === this.props.activeConversation) {
        return (
            <div className='row' key={message.key}>
              <div className='col-xs-6 col-md-5 msgcontainer'>
                <div className='message question'>

                  <MessageItem
                    m_nr={message.m_nr}
                    text={message.qtext}
                    qtext={message.qtext}
                    rtext={message.rtext}
                    msgkey={message.key}
                    is_alternative={message.is_alternative}
                    messageType='question'
                    editState={this.props.questionsEditState[message.key]}
                    deleteState={this.props.messagesDeleteState[message.key]}
                    activeConversation={this.props.activeConversation}
                     />
               </div>
              </div>

              <div className='col-xs-6 col-md-5 col-md-offset-2 msgcontainer'>
                <div className='message response'>
                  <MessageItem
                    m_nr={message.m_nr}
                    text={message.rtext}
                    qtext={message.qtext}
                    rtext={message.rtext}
                    msgkey={message.key}
                    is_alternative={message.is_alternative}
                    messageType='response'
                    editState={this.props.responsesEditState[message.key]}
                    deleteState={this.props.messagesDeleteState[message.key]}
                    activeConversation={this.props.activeConversation}
                     />
                  </div>
              </div>
            </div>
         )}
    }.bind(this));

    return (
        <div>
            {messageItems}
        </div>
    )
  }
})

module.exports = Messages;
