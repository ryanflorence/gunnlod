var store = require('./store');

function start() {
  window.addEventListener('hashchange', handleHashChange, false);
  handleHashChange();
}

function handleHashChange() {
  var route = window.location.hash.substr(0);
  var match = route.match(/\/article\/((.+)\.md)/);
  if (match) {
    store.clearArticle();
    store.fetchArticle(match[1]);
  } else {
    store.clearArticle();
  }
}

module.exports = {
  start: start,
  handleHashChange: handleHashChange
};

