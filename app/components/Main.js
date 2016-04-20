require("../styles/bootstrap.min.css");
require("../styles/style.css");

var React = require('react');
var Header = require('./Header');
var HeaderStore = require('../stores/HeaderStore');
var ConversationStore = require('../stores/ConversationStore');
var Conversations = require('./Conversations');
var ConversationItemActions = require('../actions/ConversationItemActions');
var ConversationsHeader = require('./ConversationsHeader')
var Messages = require('./Messages');
var MessageStore = require('../stores/MessageStore');
var MessageActions = require('../actions/MessageActions');
var MessagesHeader = require('./MessagesHeader');
var NewMessage = require('./NewMessage');
var StatusDialog = require('./StatusDialog');
var StatusDialogStore = require('../stores/StatusDialogStore');

var Main = React.createClass({

  getInitialState: function() {
    return {
      activeConvId: 1,
      highestM_NrForActiveConv: 0,
      conversations: [],
      messages: [],
      questionsEditState: {},
      responsesEditState: {},
      headerVisibility: false,
      alertsVisibilities: {},
      conversationsEditState: {},
      conversationsDeleteState: {},
      statusDialogVisibility: false,
      statusDialogMessage: ''
    }
  },

  componentDidMount: function() {
    HeaderStore.addChangeListener(this._onChange);
    ConversationStore.addChangeListener(this._onChange);
    ConversationItemActions.getConversations();

    MessageStore.addChangeListener(this._onChange);
    MessageActions.getMessages();

    StatusDialogStore.addChangeListener(this._onChange);
  },

  render: function() {
    return (
      <div className='app-wrapper container'>
        <Header headerVisibility={this.state.headerVisibility} />
        <div className="row">
          <StatusDialog
          isVisible={this.state.statusDialogVisibility}
          statusDialogMessage='test' />
        </div>
        <div className="row">

          <div className="col-xs-12 col-md-3 conversations">
            <ConversationsHeader />
            <Conversations
              conversations={this.state.conversations}
              conversationsEditState={this.state.conversationsEditState}
              conversationsDeleteState={this.state.conversationsDeleteState}
              />
          </div>
          <div className="col-xs-12 col-md-9 messages-container">
            <MessagesHeader />
            <Messages
              activeConversation={this.state.activeConvId}
              messages={this.state.messages}
              questionsEditState={this.state.questionsEditState}
              responsesEditState={this.state.responsesEditState}
              messagesDeleteState={this.state.messagesDeleteState}
              />
            <NewMessage
              activeConversation={this.state.activeConvId}
              highestm_nr={this.state.highestM_NrForActiveConv}
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
      conversationsEditState: ConversationStore.getConversationEditState(),
      conversationsDeleteState: ConversationStore.getConversationsDeleteState(),
      messages: MessageStore.getAllMessages(),
      questionsEditState: MessageStore.getQuestionsEditState(),
      responsesEditState: MessageStore.getResponsesEditState(),
      messagesDeleteState: MessageStore.getMessagesDeleteState(),
      headerVisibility: HeaderStore.getHeaderVisibility(),
      highestM_NrForActiveConv: MessageStore.getHighestM_NrForActiveConv(),
      statusDialogVisibility: StatusDialogStore.getStatusDialogVisibility(),
      statusDialogMessage: StatusDialogStore.getStatusDialogMessage()
    })
  },

});

module.exports = Main;
