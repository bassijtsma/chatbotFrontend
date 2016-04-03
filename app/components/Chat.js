var React = require('react');
var PropTypes = React.PropTypes;

var Chat = React.createClass({
  getInitialState: function() {
    return null;
  },
  componentDidMount: function() {

  },
  componentWillUnmount: function() {

  },
  render : function() {
    return (
      <p>Chat</p>
    )
  },
  _onChange: function() {
    // get the active conv id
  }
})


Chat.PropTypes = {
  activeConversation: PropTypes.string
}
module.exports = Chat;
