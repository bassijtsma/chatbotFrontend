var React = require('react');
var PropTypes = React.PropTypes;

var ConversationItem = React.createClass({

  getInitialState: function() {
    return {
    isSelected: false,
    conversationName: null,
    conversationId: null
    }
  },

  componentDidMount: function() {
    this.setState({
      conversationName: this.props.conversationName,
      conversationId: this.props.conversationId
    })
  },
  componentWillUnmount: function() {
    console.log('willUnmount');
  },

  render: function() {
    return(
    <div>
      <h2>{this.state.conversationName}</h2>
      <p>id: {this.state.conversationId}</p>
      <p>edit | delete</p>
    </div>
    )
  },

  _onChange: function() {
    console.log('onChange')
  }
})

ConversationItem.PropTypes = {
  conversationName: PropTypes.string,
  conversationId: PropTypes.string
}

module.exports = ConversationItem;
