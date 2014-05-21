/** @jsx React.DOM */

var React = require('react');
var Toolbar = require('./toolbar');
var store = require('../lib/store');
var md = require('meta-marked');
var debounce = require('../lib/debounce');
var throttle = require('../lib/throttle');
var Frame = require('./frame');

var Article = module.exports = React.createClass({

  getInitialState: function() {
    return {
      liveContent: this.props.content,
      template: this.evalTemplate()
    };
  },

  evalTemplate: function() {
    if (this.props.config.template) {
      return eval('('+this.props.config.template+')');
    } else {
      console.log('default template');
      return this.defaultTemplate;
    }
  },

  defaultTemplate: function(React, meta, content) {
    return <div dangerouslySetInnerHTML={{__html: content}}/>
  },

  handleCodeChange: throttle(function() {
    var textarea = this.refs.code.getDOMNode();
    this.setState({
      liveContent: textarea.value
    });
    this.forceRepaint();
    this.saveArticle();
  }, 150),

  forceRepaint: function(textarea, iframe) {
    var textarea = this.refs.code.getDOMNode();
    // fix weird layout bug where the textarea doesn't get its
    // styles applied after the first time you type, caused by
    // setting the innerHTML of the div in the iframe
    textarea.style.display='none';
    textarea.offsetHeight;
    textarea.style.display='';
    this.forceRepaint = function(){};
  },

  saveArticle: debounce(function() {
    store.saveArticle({
      content: this.state.liveContent
    });
  }),

  buildStylesheets: function() {
    if (!this.props.config.stylesheets) {
      return;
    }
    return this.props.config.stylesheets.map(function(sheet) {
      return <link rel="stylesheet" href={sheet} />;
    });
  },

  render: function() {
    var data = md(this.state.liveContent);
    var content = data.html;
    var meta = data.meta;
    var template;
    try {
      template = this.state.template.call(this, React, meta, content);
    } catch(e) {
      console.warn('Your template threw an error, better check that out.');
      console.warn(e);
    }
    return (
      <div className="Article flex-column flex-grow">
        <Toolbar onSave={this.saveArticle} onToggle={this.props.onToggleNav} />
        <div className="flex-row flex-grow editor">
          <textarea
            className="code flex-grow"
            ref="code"
            onChange={this.handleCodeChange}
            defaultValue={this.state.liveContent}
          />
          <Frame ref="preview" className="preview flex-grow" head={this.buildStylesheets()}>
            {template}
          </Frame>
        </div>
      </div>
    );
  }
});

