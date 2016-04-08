var React = require('react');
var PropTypes = React.PropTypes;

var MessagesHeader = React.createClass({
  render : function() {
    return (
      <div className='row'>
        <div className='messages-header'>
          <p>ChatHeader</p>
        </div>
      </div>
    )
  }
})

module.exports = MessagesHeader;
