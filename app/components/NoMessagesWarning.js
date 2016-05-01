var React = require('react');
var PropTypes = React.PropTypes;

var Instructions = React.createClass({
  render : function() {
    if (this.props.isVisible) {
      var warning = <div className='row'>
        <div className="col-sm-offset-2 col-sm-8">
            <div className="nomsgwarning">
              <h1>Oops!</h1>
                <p>
                  It looks like there are no messages to
                  display yet. Create your messages below!
                </p>
            </div>
          </div>
      </div>
    } else {
      var warning = null;
    }
    return (warning)
  }
})

module.exports = Instructions;
