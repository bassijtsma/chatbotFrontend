var React = require('react');
var transparantBg = require('../styles').transparantBg;
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var Home = React.createClass({
  render: function() {
    return (
      <div className="jumbotron col-sm-6 text-center" style={transparantBg}>
        <hi>home</hi>
      </div>
    )
  }
});

module.exports = Home;
