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
        <div className="col-sm-12 sidebartop">
          <h1>Chatbot Manager</h1>
          <p onClick={this._onHeaderToggle} className='headertext'>What is this?</p>
          {this.props.headerVisibility
            ? <div>
                  <div className="circular"></div>
                <p className='headertext'>
                  This is a chatbot editor. Create conversations ...
                </p>
              </div>
            : null}
        </div>
      </div>
    )
  },

  _onHeaderToggle: function() {
    HeaderActions.toggleInformation();
  }

})

module.exports = Header;
