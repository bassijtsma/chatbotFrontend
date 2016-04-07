var React = require('react');
var PropTypes = React.PropTypes;
var AlertDeleteMessage = require('./AlertDeleteMessage');
var AlertStore = require('../stores/AlertStore');
var AlertActions = require('../actions/AlertActions');

var Alerts = React.createClass({
  getInitialState: function() {
    return ({
      deleteMessageAlertVisibilty: false,
      deleteMessageId: null
    });
  },

  componentDidMount: function() {
    AlertStore.addChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <AlertDeleteMessage
          visibility={this.state.deleteMessageAlertVisibilty}
          objectId={this.state.deleteMessageId} />
      </div>
    );
  },

  _onChange: function() {
    this.setState({
      deleteMessageAlertVisibilty: AlertStore.getDeleteMessageAlertVisibility(),
      deleteMessageId: AlertStore.getDeleteMessageId()
    })
  },

})

module.exports = Alerts;
