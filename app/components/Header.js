var React = require('react');
var PropTypes = React.PropTypes;

var Header = React.createClass({

  shouldComponentUpdate: function() {
    return true;
  },
  render : function() {
    return (
      <div className="row">
        <div className="col-sm-12 sidebartop">
          <h1 className="sidebar-title">Chatbot Manager</h1>
          <div className="circular"></div>
        </div>
      </div>
    )
  }
})

module.exports = Header;
