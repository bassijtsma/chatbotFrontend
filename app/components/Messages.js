var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');
var MessageItem = require('../components/MessageItem');

var Messages = React.createClass({

  getInitialState: function() {
    return null;
  },

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
          <MessageItem
            key={message._id}
            messagenr={message._nr}
            responseText={message.rtext}
            questionText={message.qtext}
            isAlternative={message.is_alternative}
            conversationId={message.conv_id}
             />
         )}
    });

    console.log('calling render')
    return (
      <div className="col-xs-8">
        <p>Messages is here!</p>
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
