var React = require('react');
var PropTypes = React.PropTypes;
var MessageActions = require('../actions/MessageActions');


var MessageOptions = React.createClass({
	propTypes: {
		m_nr: React.PropTypes.number.isRequired,
		msgkey: React.PropTypes.number.isRequired
	},

	render: function() {
		return (
        <p className="message-options">

					<input type='checkbox'
						checked={this.props.is_alternative}
						onChange={this.props.toggleAltFn}
						className="alternative-checkbox" />
					<span onClick={this.props.toggleAltFn}>Alternate </span>|

					{!this.props.deleteState
						? <span onClick={this.props.editFn.bind(null,
		          this.props.msgkey, this.props.messageType)}>
		          {this.props.editState
								? <span onClick={this.props.updateFn} type='submit'> Save </span>
								: ' Edit '}
		        </span>
						: null
					}

					{this.props.deleteState
						? <span>
								Delete message?
								<span onClick={this._confirmDeleteMessage.bind(this,
									this.props.msgkey)}> Confirm</span>
								<span> | </span>
								<span onClick={this._toggleDeleteMessage.bind(this,
										this.props.msgkey)}>Cancel</span>
							</span>

						: <span onClick={this._toggleDeleteMessage.bind(this,
		          this.props.msgkey)}>| Delete </span>
					}
        </p>
    );
	},


  _toggleDeleteMessage: function(key) {
    MessageActions.toggleDeleteMessageAlert(key);
  },

	_confirmDeleteMessage: function(key) {
		var requestBody = {
			'conv_id' : this.props.convId,
			'm_nr' : this.props.m_nr,
			'key' : this.props.msgkey
		}
		MessageActions.deleteMessage(key, requestBody);
	}
})


module.exports = MessageOptions;
