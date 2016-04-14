var React = require('react');
var PropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');


var MessageOptions = React.createClass({
	render: function() {
		return (
      <div>
        <p>

					{!this.props.messagesDeleteState
						? <span onClick={this._editMessage.bind(this,
		          this.props.objectId, this.props.messageType)}>
		          {this.props.editState ? 'Save ' : 'Edit '}
		        </span>
						: null
					}


					{this.props.messagesDeleteState
						? <span>
								Delete message?
								<span onClick={this._confirmDeleteMessage.bind(this,
									this.props.objectId)}> Confirm</span>
								<span> | </span>
								<span onClick={this._toggleDeleteMessage.bind(this,
										this.props.objectId)}>Cancel</span>
							</span>

						: <span onClick={this._toggleDeleteMessage.bind(this,
		          this.props.objectId)}> Delete </span>
					}
        </p>
      </div>
    );
	},

  _editMessage: function(objectId, messageType) {
    MessageActions.editMessage(objectId, messageType);
  },

  _toggleDeleteMessage: function(objectId) {
    MessageActions.toggleDeleteMessageAlert(objectId);
  },

	_confirmDeleteMessage: function(objectId) {
		var requestBody = {
			'conv_id' : this.props.activeConversation,
			'm_id' : this.props.messagenr
		}
		MessageActions.deleteMessage(objectId, requestBody);
	}

})

module.exports = MessageOptions;
