var React = require('react');
var PropTypes = React.PropTypes;
var AlertActions = require('../actions/AlertActions');


var AlertDeleteMessage = React.createClass({
  render: function() {
    return (

      this.props.visibility
        ?  <div>
            <p>This will delete both the question and response. Are you sure?</p>
            <p><span onClick={this._confirmDeleteMessage}>Yes</span> |
              <span onClick={this._cancelDeleteMessage}>No</span> | </p>
          </div>
        : null
    );
  },
  _confirmDeleteMessage: function() {
    AlertActions.confirmDeleteMessageAlert();
  },

  _cancelDeleteMessage: function() {

  }
})

module.exports = AlertDeleteMessage;
