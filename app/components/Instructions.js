var React = require('react');
var PropTypes = React.PropTypes;

var Instructions = React.createClass({
  render : function() {
    if (this.props.isVisible) {
      var instructions =
        <div>
          <p>
           This app allows you to create and manage automated
           conversations with a Whatsapp Chatbot. See the example
           chat to the right: Whenever a message contains
           "hi there", it will reply with "Hi! :) How are you?". Test it now!
          </p>

          <ol className="instructions-text">
           <li>Add chatbot to your contacts</li>
           <li>Send a message to the chatbot</li>
           <li>Receive automated reply!</li>
           <li>Created or changed automated messages? Send the chatbot
               a message with the text: "chatbot reset" to load the new
               configuration </li>
          </ol>
        </div>
    } else {
      var instructions = null;
    }
    return (instructions);
  },

})

module.exports = Instructions;
