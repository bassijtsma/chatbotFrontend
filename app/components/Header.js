var React = require('react');
var PropTypes = React.PropTypes;
var HeaderActions = require('../actions/HeaderActions');
var HeaderStore = require('../stores/HeaderStore');


function getHeaderState() {
  return ({
    headerVisibility: HeaderStore.getHeaderVisibility()
  })
}


var Header = React.createClass({

  getInitialState: function() {
    return {
      headerVisibility: false
    };
  },

  componentDidMount: function() {
    console.log('component Did mount');
    HeaderStore.addChangeListener(this._onChange);
  },

  render : function() {
    return (
      <div>
        <h1>Chatbot Manager</h1>
        <p onClick={this._onHeaderToggle}>help</p>
        {this.state.headerVisibility ? <p>help text?</p> : null}
      </div>
    )
  },

  _onHeaderToggle: function() {
    HeaderActions.toggleInformation();
  },

  _onChange: function() {
    this.setState(getHeaderState());
  }

})

module.exports = Header;
