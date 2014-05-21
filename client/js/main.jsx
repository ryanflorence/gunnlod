/** @jsx React.DOM */
var React = require('react');
var App = require('./components/app');
var xhr = require('./lib/xhr');

xhr.getJSON('/config', function(config) {
  React.renderComponent(<App config={config} />, document.body);
});

