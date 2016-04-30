var React = require('react');
var PropTypes = React.PropTypes;

var StatusDialog = React.createClass({
  render: function() {
    return (
      <div className="row">
        {this.props.isVisible
        ? <p>{this.props.statusDialogMessage}</p>
        : null}
      </div>
    )
  }
});

module.exports = StatusDialog;
