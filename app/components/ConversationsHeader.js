var React = require('react');
var PropTypes = React.PropTypes;
var ConversationItemActions = require('../actions/ConversationItemActions');
var ConversationStore = require('../stores/ConversationStore');
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

var ConversationsHeader = React.createClass({
  getInitialState: function() {
      return {
        newConvHover: false
      }
  },

  render: function() {
    return (
      <div className='conversations-header'>

        <div>
          <ReactCSSTransitionGroup transitionName="newConvHover"
          transitionEnterTimeout={300} transitionLeaveTimeout={300}>
            {this.state.newConvHover
              ? <span key='1' className='newconvhover'>New conversation </span>
              : null
            }
          </ReactCSSTransitionGroup>
          <span className="glyphicon glyphicon-plus"
          onMouseOver={this.onNewConversationHover}
          onMouseOut={this.offNewConversationHover}
          aria-hidden="true" />
        </div>
      </div>
    )
  },

  onNewConversationHover: function() {
    this.setState({
      newConvHover: true
    })
  },

  offNewConversationHover: function() {
    this.setState({
      newConvHover: false
    })
  }
})

module.exports = ConversationsHeader;
