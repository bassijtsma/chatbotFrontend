var React = require('react');
var PropTypes = React.PropTypes;

var ConversationItem = React.createClass({

  getInitialState: function() {
    isSelected: false,
    conversationName: '',
    conversationId: null,
  },

  componentDidMount: function() {
    this.setState({
      conversationName: this.props.conversationName,
      conversationId: this.props.conversationId
    }).bind(this)
  },
  componentWillUnmount: function() {

  },
  render: function() {
    <div>
      <h2>{this.state.conversationName}</h2>
      <p>id: {this.state.conversationId}</p>
      <p>edit | delete</p>
    </div>
  }

  _onChange: function() {

  }
})

ConversationItem.PropTypes = {
  conversationName: PropTypes.string,
  conversationId: PropTypes.string
}

module.exports = ConversationItem;
