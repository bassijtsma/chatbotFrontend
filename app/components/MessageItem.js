var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');
var MessageActions = require('../actions/MessageActions');

var MessageItem = React.createClass({

  getInitialState: function() {
    return null;
  },

  render: function() {

    return (
      <div className='col-xs-6'>

        <p>{this.props.text}</p>
        <p>{this.props.isAlternative}</p>
        <p onClick={this._editMessage.bind(this, this.props.objectId)}>
          {this.props.editState ? 'Save' : 'Edit'}
        </p>
      </div>
    )
  },

  _onChange: function() {

  },

  _editMessage: function(objectId) {
    MessageActions.editMessage(objectId)
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
