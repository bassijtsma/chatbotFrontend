var React = require('react');
var PropTypes = React.PropTypes;

var StatusDialog = React.createClass({
  render: function() {
    return (
      <span>
        {this.props.isVisible
        ? <span>{this.props.statusDialogMessage}</span>
        : null}
      </span>
    )
  }
});

module.exports = StatusDialog;
