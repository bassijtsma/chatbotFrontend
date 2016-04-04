var React = require('react');
var Header = require('./Header');
var ConversationStore = require('../stores/ConversationStore');
var Conversations = require('./Conversations');
var ConversationItemActions = require('../actions/ConversationItemActions');
var ChatHeader = require('./ChatHeader');
var Chat = require('./Chat');


var Main = React.createClass({

  getInitialState: function() {
    return {
      activeConvId: 1,
      conversations: []
    }
  },

  componentDidMount: function() {
    ConversationStore.addChangeListener(this._onChange);
    ConversationItemActions.getConversations();
  },

  render: function() {
    return (
      <div>
        <Header />
        <div className="main-container">
          <div className="row">
            <Conversations conversations={this.state.conversations}/>
            <ChatHeader />
            <Chat activeConversation={this.state.activeConvId}/>
            <p>hi</p>
          </div>
        </div>
      </div>
    )
  },

  _onChange: function() {
    this.setState({
      activeConvId : ConversationStore.getActiveConversation,
      conversations: ConversationStore.getAllConversations()
    })
  }

});

module.exports = Main;
