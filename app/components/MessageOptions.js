var React = require('react');
var PropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');


var MessageOptions = React.createClass({
	propTypes: {
		m_nr: React.PropTypes.number.isRequired,
		objectId: React.PropTypes.string.isRequired
	},
	render: function() {
		return (
      <div>
        <p>

					{!this.props.deleteState
						? <span onClick={this._editMessage.bind(this,
		          this.props.objectId, this.props.messageType)}>
		          {this.props.editState ? 'Save ' : 'Edit '}
		        </span>
						: null
					}


					{this.props.deleteState
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
			'conv_id' : this.props.convId,
			'm_nr' : this.props.m_nr
		}
		MessageActions.deleteMessage(objectId, requestBody);
	}
})


module.exports = MessageOptions;
