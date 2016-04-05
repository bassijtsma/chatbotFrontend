var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');

var MessageItem = React.createClass({

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
    return (
      <div>
        <p>{this.props.questionText}</p>
        <p>{this.props.responseText}</p>
        <br />
      </div>
    )
  },

  _onChange: function() {

  }
})

MessageItem.PropTypes = {
  messagenr: PropTypes.number.isRequired,
  questionText: PropTypes.string.isRequired,
  responseText: PropTypes.string.isRequired,
  isAlternative: PropTypes.bool.isRequired,
  conversationId: PropTypes.number.isRequired
}

module.exports = MessageItem;
