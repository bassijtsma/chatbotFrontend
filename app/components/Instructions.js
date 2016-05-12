var React = require('react');
var PropTypes = React.PropTypes;

var Instructions = React.createClass({
  render : function() {
    if (this.props.isVisible) {
      var instructions =
        <div>
          <p>
           This app allows you to create and manage automated
           conversations for a Whatsapp and Facebook Chatbot. See the example
           chat below: Whenever a message contains
           "hi there", it will reply with "Hi! :) How are you?". Test it now!
          </p>

          <ol className="instructions-text">
           <li>Add your facebook account to the chatbot page as a developer</li>
           <li>Visit the chatbot facebook page</li>
           <li>Send it a message thats shown below</li>
           <li>Receive automated reply!</li>
           <li>Created or modified automated messages? Send the text:
             "chatreset" to load the new configuration </li>
          </ol>
        </div>
    } else {
      var instructions = null;
    }
    return (instructions);
  },

})

module.exports = Instructions;
