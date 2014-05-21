/** @jsx React.DOM */
// thank you zendesk http://developer.zendesk.com/blog/2014/05/13/rendering-to-iframes-in-react/

var React = require('react');

var Frame = module.exports = React.createClass({

  render: function() {
    return <iframe className={this.props.className} />;
  },

  componentDidMount: function() {
    this.renderFrameContents();
  },

  renderFrameContents: function() {
    var doc = this.getDOMNode().contentWindow.document;
    if (doc.readyState === 'complete') {
      var contents = (
        <div>
        &shy;{this.props.head}
        {this.props.children}
        </div>
      );
      React.renderComponent(contents, doc.body);
    } else {
      setTimeout(this.renderFrameContents, 0);
    }
  },

  componentDidUpdate: function() {
    this.renderFrameContents();
  },

  componentWillUnmount: function() {
    React.unmountComponentAtNode(this.getDOMNode().contentWindow.document.body);
  }

});

