var path = require('path');

exports.srcDirectory = 'articles';

exports.stylesheets = [
  'styles.css'
];

exports.template = function(React, meta, content) {
  return React.DOM.div({className: 'container'}, [
    React.DOM.h1(null, meta.title),
    React.DOM.div(null, React.DOM.time(null, meta.pubdate)),
    React.DOM.hr(),
    React.DOM.div({dangerouslySetInnerHTML: {__html: content}})
  ]);
};

