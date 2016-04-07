var React = require('react');
var PropTypes = React.PropTypes;

var AlertDeleteMessage = React.createClass({
  render: function() {
    return (
      <div>
      {this.props.visibility
        ?  <div>
            <p>This will delete both the question and response. Are you sure?</p>
            <p>Yes | No</p>
          </div>
        : 'not showing anything' }
        </div>
    );
  }
})

module.exports = AlertDeleteMessage;
