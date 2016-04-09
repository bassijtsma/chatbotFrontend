var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');
var MessageItem = require('./MessageItem');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var NewMessage = React.createClass({
  render: function() {
    return (
      <div className='row new-message'>
        <div className='col-xs-6'>
          <div className='message question'>
            <p>hi</p>
          </div>

        </div>

        <div className='col-xs-6'>
          <div className='message response'>
            <p>doei</p>
          </div>
        </div>
      </div>
    )
  }
})

module.exports = NewMessage;
