var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');
var MessageActions = require('../actions/MessageActions');
var MessageOptions = require('./MessageOptions');

var MessageItem = React.createClass({


  render: function() {
    return (
      <div>
        {this.props.editState
        ? <p>Edit the message text </p>
        : <p>{this.props.text}</p> }


        <MessageOptions
            objectId={this.props.objectId}
            messageType={this.props.messageType}
            editState={this.props.editState}
            deleteState={this.props.deleteState}
            m_nr={this.props.m_nr}
            convId={this.props.activeConversation} />
      </div>
    )
  }
})

MessageItem.PropTypes = {
  messagenr: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
  isAlternative: PropTypes.bool.isRequired,
  messageType: PropTypes.string.isRequired,
  objectId: PropTypes.string.isRequired
}

module.exports = MessageItem;
