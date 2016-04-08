var React = require('react');
var PropTypes = React.PropTypes;

var ConversationsHeader = React.createClass({
  render: function() {
    return (
      <div className='conversations-header'>
        <p>Conversations</p>
      </div>
    )
  }
})

module.exports = ConversationsHeader;
