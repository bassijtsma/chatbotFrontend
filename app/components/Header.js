var React = require('react');
var PropTypes = React.PropTypes;
var HeaderActions = require('../actions/HeaderActions');
var HeaderStore = require('../stores/HeaderStore');

var Header = React.createClass({

  propTypes: {
    todo: PopTypes.bool.isRequired
  },

  getInitialState: function() {
    return {
      headerVisibility: false
    };
  },

  componentDidMount: function() {
    headerVisibility: HeaderActions.g
  }



  render : function() {
    return (
      <div>
        <h1>Chatbot Manager</h1>
        <p>help</p>
      </div>
    )
  }
})

module.exports = Header;
