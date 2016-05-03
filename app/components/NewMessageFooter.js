var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');
var MessageActions = require('../actions/MessageActions');

var NewMessageFooter = React.createClass({
  getInitialState: function(){
    return {
      questionInputField: '',
      responseInputField: '',
    }
  },
  render: function() {
    return (
      <footer className="footer">
        <div className="container-fluid">
          <div className="col-sm-9 col-sm-offset-3 col-md-9 col-md-offset-3 main-footer">
            <div className="newmsg-header">
                <p className="newmsg-text">Create a new message:</p>
            </div>
            <form onSubmit={this.onSaveForm}>
              <div className='row'>
                <div className='col-xs-6 col-md-5 newmsgquestion'>
                  <input type="text"
                    className="newmessage-input"
                    value={this.state.questionInputField}
                    placeholder='New message...'
                    onChange={this.updateQuestionInputField}/>
                </div>

                <div className='col-xs-6 col-md-5 col-md-offset-2 newmsgresponse'>

                  <div className='newmsg-container'>
                    <div className="newmsg-input-container">
                      <input type="text"
                      className="newmessage-input"
                      value={this.state.responseInputField}
                      placeholder='New response...'
                      onChange={this.updateResponseInputField} />
                    </div>

                    <div className="newmsg-submit">
                      <button type="submit" className="save-newmsg">Save</button>
                    </div>

                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </footer>


    )
  },

  updateQuestionInputField: function(event) {
    this.setState({
      questionInputField: event.target.value
    })
  },

  updateResponseInputField: function(event) {
    this.setState({
      responseInputField: event.target.value
    })
  },

  onSaveForm: function(event) {
    event.preventDefault();
    event.stopPropagation();
    this.createNewMessage();
  },

  createNewMessage: function() {
    var newMessage = {};
    newMessage.qtext = this.state.questionInputField;
    newMessage.rtext = this.state.responseInputField;
    newMessage.conv_id = this.props.activeConversation;
    newMessage.m_nr = this.props.highestm_nr + 1;
    newMessage.is_alternative = false;
    var temporaryObjectId = (String(Math.floor(Date.now() / 1000)) + this.props.highestm_nr);
    newMessage._id = temporaryObjectId;
    console.log('new msg:', newMessage);
    MessageActions.createNewMessage(newMessage);
  }

})

module.exports = NewMessageFooter;
