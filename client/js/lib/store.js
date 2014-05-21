var clone = require('clone');
var xhr = require('./xhr');

module.exports = {
  onChange: function() {},

  getState: function() {
    return clone(this.state);
  },

  state: {
    articles: {
      loaded: false,
      records: []
    },
    article: {
      loading: false,
      loaded: false
    },
    articleIndex: {}
  },

  getArticles: function() {
    if (this.state.articles.loaded) {
      this.onChange();
    } else {
      xhr.getJSON('/articles', function(res) {
        this.state.articles.loaded = true;
        this.state.articles.records = res.articles;
        this.onChange();
      }.bind(this));
    }
  },

  fetchArticle: function(name) {
    if (this.state.articleIndex[name]) {
      this.state.article = this.state.articleIndex[name];
      this.onChange();
    } else {
      this.clearArticle();
      this.state.article.name = name;
      xhr.getJSON('/article/'+name, function(res) {
        var article = clone(res.article);
        article.loaded = true;
        article.loading = false;
        this.state.article = article;
        this.state.articleIndex[name] = article;
        this.onChange();
      }.bind(this));
    }
  },

  clearArticle: function() {
    this.state.article = {
      loading: false,
      loaded: false
    };
    this.onChange();
  },

  saveArticle: function(patch) {
    for (var key in patch) {
      this.state.article[key] = patch[key];
    }
    var article = this.state.article;
    var data = { article: article };
    xhr.postJSON('/article/'+article.name, article, function(res) {
      this.onChange();
    }.bind(this));
    this.onChange();
  }
};


