var React = require('react');
var PropTypes = React.PropTypes;
var HeaderActions = require('../actions/HeaderActions');
var HeaderStore = require('../stores/HeaderStore');


var Header = React.createClass({

  shouldComponentUpdate: function() {
    return true;
  },

  render : function() {
    return (
      <div className="row">
        <h1>Chatbot Manager</h1>
        <p onClick={this._onHeaderToggle} className='headertext'>help</p>
        {this.props.headerVisibility ? <p className='headertext'>help text?</p> : null}
      </div>
    )
  },

  _onHeaderToggle: function() {
    HeaderActions.toggleInformation();
  }

})

module.exports = Header;
