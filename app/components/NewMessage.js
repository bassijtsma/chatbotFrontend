var React = require('react');
var PropTypes = React.PropTypes;
var MessageStore = require('../stores/MessageStore');
var MessageActions = require('../actions/MessageActions');

var NewMessage = React.createClass({
  getInitialState: function(){
    return {
      questionInputField: "",
      responseInputField: "",
    }
  },
  render: function() {
    return (
      <div className='row new-message'>
        <div className='col-xs-5'>
          <input type="text" value={this.state.questionInputField} placeholder='yo' onChange={this.updateQuestionInputField}/>
        </div>

        <div className='col-xs-5'>
        <input type="text" value={this.state.responseInputField} onChange={this.updateResponseInputField} />
        </div>

        <div className='col-xs-2'><button onClick={this.saveInput}>Save</button></div>
      </div>
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

  saveInput: function() {
    console.log('the highestm_nr is now:', this.props.highestm_nr)
    var newMessage = {};
    newMessage.rtext = this.state.questionInputField;
    newMessage.qtext = this.state.responseInputField;
    newMessage.conv_id = this.props.activeConversation;
    newMessage.m_nr = this.props.highestm_nr + 1;
    newMessage.is_alternative = false;
    var temporaryObjectId = (String(Math.floor(Date.now() / 1000)) + this.props.highestm_nr);
    newMessage._id = temporaryObjectId;
    console.log('new msg:', newMessage);
    MessageActions.createNewMessage(newMessage);
  }

})

module.exports = NewMessage;
