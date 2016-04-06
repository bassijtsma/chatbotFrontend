var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');
var MessageActions = require('../actions/MessageActions');

var MessageItem = React.createClass({


  render: function() {
    return (
      <div>
        <p>{this.props.text}</p>
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
