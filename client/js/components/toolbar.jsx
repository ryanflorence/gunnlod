/** @jsx React.DOM */

var React = require('react');
var icons = require('../lib/icons');

var Toolbar = module.exports = React.createClass({

  render: function() {
    return (
      <div className="Toolbar flex-no-shrink flex-row">
        <div className="flex-grow">
          <button className="nav-toggle" onClick={this.props.onToggle}>
            {icons.menu()}
          </button>
        </div>

        <div className="flex-grow align-right">
          <button className="save" onClick={this.props.onSave}>
            {icons.save()}
          </button>
        </div>
      </div>
    );
  }

});

