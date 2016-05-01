var React = require('react');
var PropTypes = React.PropTypes;
var Instructions = require('./Instructions');
var MessageActions = require('../actions/MessageActions');

var StatusDialog = React.createClass({
  propTypes: {
      isVisible: PropTypes.bool.isRequired,
      instructionsVisibility: PropTypes.bool.isRequired
  },

  render: function() {
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="message">
            <p className="instructions-title"
              onClick={this._onInstructionsToggle}>See instructions</p>
            {this.props.isVisible
            ? <p>{this.props.statusDialogMessage}</p>
            : null}
            <Instructions isVisible={this.props.instructionsVisibility} />
          </div>
        </div>
      </div>
    )
  },
  _onInstructionsToggle: function() {
    MessageActions.toggleInstructions();
  }
});

module.exports = StatusDialog;
