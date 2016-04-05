var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');
var MessageItem = require('../components/MessageItem');

var Messages = React.createClass({

  componentDidMount: function() {
    MessageStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    MessageStore.removeChangeListener(this._onChange);
  },

  render: function() {
    var activeConversation = this.props.activeConversation;

    var messageItems = this.props.messages.map(function (message) {
      if (message.conv_id === activeConversation) {
        return (
          <div className='row' key={message._id}>
            <div className='col-xs-6'>
              <MessageItem
                objectId={message._id}
                messagenr={message.m_nr}
                text={message.qtext}
                isAlternative={message.is_alternative}
                messageType='question'
                editState={this.props.messagesEditState[message._id]} />
            </div>

            <div className='col-xs-6'>
              <MessageItem
                objectId={message._id}
                messagenr={message.m_nr}
                text={message.rtext}
                isAlternative={message.is_alternative}
                messageType='response'
                editState={this.props.messagesEditState[message._id]} />
            </div>
          </div>
         )}
    }.bind(this));

    return (
      <div className="col-xs-8">
        {messageItems}
      </div>
    )
  },

  _onChange: function() {

  }
})


Messages.PropTypes = {
  activeConversation: PropTypes.string.isRequired,
  messages: PropTypes.array.isRequired
}

module.exports = Messages;
