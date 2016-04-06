var React = require('react');

var Header = require('./Header');
var HeaderStore = require('../stores/HeaderStore');

var ConversationStore = require('../stores/ConversationStore');
var Conversations = require('./Conversations');
var ConversationItemActions = require('../actions/ConversationItemActions');

var MessageStore = require('../stores/MessageStore');
var MessageActions = require('../actions/MessageActions');

var ChatHeader = require('./ChatHeader');
var Messages = require('./Messages');


var Main = React.createClass({

  getInitialState: function() {
    return {
      activeConvId: 1,
      conversations: [],
      messages: [],
      questionsEditState: {},
      responsesEditState: {},
      headerVisibility: false,
    }
  },

  componentDidMount: function() {
    HeaderStore.addChangeListener(this._onChange);
    ConversationStore.addChangeListener(this._onChange);
    MessageStore.addChangeListener(this._onChange);
    ConversationItemActions.getConversations();
    MessageActions.getMessages();
  },

  render: function() {
    return (
      <div>
        <Header headerVisibility={this.state.headerVisibility} />
        <div className="main-container">
          <div className="row">
            <Conversations conversations={this.state.conversations}/>
            <ChatHeader />
            <Messages
              activeConversation={this.state.activeConvId}
              messages={this.state.messages}
              questionsEditState={this.state.questionsEditState}
              responsesEditState={this.state.responsesEditState}
              />
          </div>
        </div>
      </div>
    )
  },

  _onChange: function() {
    this.setState({
      activeConvId : ConversationStore.getActiveConversation(),
      conversations: ConversationStore.getAllConversations(),
      messages: MessageStore.getAllMessages(),
      questionsEditState: MessageStore.getQuestionsEditState(),
      responsesEditState: MessageStore.getResponsesEditState(),
      headerVisibility: HeaderStore.getHeaderVisibility()
    })
  }

});

module.exports = Main;
