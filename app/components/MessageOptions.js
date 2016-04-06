var React = require('react');
var PropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');

var MessageOptions = React.createClass({
	render: function() {
		return (
      <p onClick={this._editMessage.bind(this,
                  this.props.objectId, this.props.messageType)}>
        {this.props.editState ? 'Save' : 'Edit'}
      </p>
    );
	},

  _editMessage: function(objectId, messageType) {
    MessageActions.editMessage(objectId, messageType)
  }

})

module.exports = MessageOptions;
