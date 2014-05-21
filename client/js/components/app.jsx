/** @jsx React.DOM */
var React = require('react');
var store = require('../lib/store');
var router = require('../lib/router');
var Article = require('./article');
var clone = require('clone');
var md = require('meta-marked');

var App = module.exports = React.createClass({

  getInitialState: function() {
    return {
      data: store.getState(),
      navOpen: true
    };
  },

  setDataState: function() {
    this.setState({data: store.getState()});
  },

  componentDidMount: function() {
    store.onChange = this.setDataState;
    store.getArticles();
    router.start();
  },

  toggleNav: function() {
    this.setState({ navOpen: !this.state.navOpen });
  },

  rootClassName: function() {
    var className = 'App flex-row';
    if (this.state.navOpen) {
      className += ' nav-open';
    }
    return className;
  },

  buildLinks: function() {
    return this.state.data.articles.records.map(function(article) {
      var href = '#/article/'+article.name;
      var active = this.state.data.article.name === article.name ? 'active' : '';
      return <li><a className={active} href={href}>{article.name}</a></li>;
    }, this);
  },

  buildDetail: function() {
    if (this.state.data.article.loaded) {
      var props = clone(this.state.data.article);
      props.onToggleNav = this.toggleNav;
      props.config = this.props.config;
      return Article(props);
    } else {
      return <div className="flex-column flex-grow"/>
    }
  },

  render: function() {
    return (
      <div className={this.rootClassName()}>
        <ul className="master flex-no-shrink">
          {this.buildLinks()}
        </ul>
        {this.buildDetail()}
      </div>
    );
  }
});


