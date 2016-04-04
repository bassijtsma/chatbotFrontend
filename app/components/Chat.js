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
      <div className="col-xs-8">
        <p>Chat is here!</p>
      </div>
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
