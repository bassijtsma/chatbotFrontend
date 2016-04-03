var React = require('react');
var Header = require('./Header');
var ConversationStore = require('../stores/ConversationStore');
var Conversations = require('./Conversations');
var ChatHeader = require('./ChatHeader');
var Chat = require('./Chat');


var Main = React.createClass({

  getInitialState: function() {
    return {
      zehinitstate : null,
      activeConvId: 'placeholder',
    }
  },

  componentDidMount: function() {
    ConversationStore.addChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div>
        <Header />
        <Conversations />
        <ChatHeader />
        <Chat activeConversation={this.props.activeConvId}/>
        <p>hi</p>
      </div>
    )
  },

  _onChange: function() {
    this.setState({
      activeConvId : ConversationStore.getActiveConversation
    })
  }

});

module.exports = Main;
