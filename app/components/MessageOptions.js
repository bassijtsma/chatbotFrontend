var React = require('react');
var PropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');
var AlertActions = require('../actions/AlertActions');

var MessageOptions = React.createClass({
	render: function() {
		return (
      <div>
        <p>
					<span onClick={this._editMessage.bind(this,
	          this.props.objectId, this.props.messageType)}>
	          {this.props.editState ? 'Save' : 'Edit'}
	        </span>

	        <span onClick={this._deleteMessage.bind(this,
	          this.props.objectId)}> Delete
					</span>
        </p>
      </div>
    );
	},

  _editMessage: function(objectId, messageType) {
    MessageActions.editMessage(objectId, messageType);
  },

  _deleteMessage: function(objectId, messageType) {
    MessageActions.showDeleteMessageAlert(objectId);
  }

})

module.exports = MessageOptions;
