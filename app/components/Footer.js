var React = require('react');
var PropTypes = React.PropTypes;

var Footer = React.createClass({
  render: function() {
    return (
      <footer className="footer">
        <div className="container">
          <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">
            <p className="text-muted">Place sticky footer content here.</p>
          </div>
        </div>
      </footer>
    )
  }
})

module.exports = Footer;
