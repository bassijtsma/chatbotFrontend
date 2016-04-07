var React = require('react');
var PropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');
var AlertActions = require('../actions/AlertActions');

var MessageOptions = React.createClass({
	render: function() {
		return (
      <div>
        <p onClick={this._editMessage.bind(this,
                    this.props.objectId, this.props.messageType)}>
          {this.props.editState ? 'Save' : 'Edit'}
        </p>

        <p onClick={this._deleteMessage.bind(this,
                    this.props.objectId)}>
          Delete
        </p>
      </div>
    );
	},

  _editMessage: function(objectId, messageType) {
    MessageActions.editMessage(objectId, messageType);
  },

  _deleteMessage: function(objectId, messageType) {
    AlertActions.showDeleteMessageAlert(objectId);
  }

})

module.exports = MessageOptions;
