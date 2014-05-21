var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var clone = require('clone');

module.exports = function(app) {

  /* GET home page. */
  router.get('/articles', function(req, res) {
    var files = fs.readdirSync(srcDirectory()).map(function(name) {
      return { name: name };
    });
    res.json({articles: files});
  });

  router.get('/article/:name', function(req, res) {
    var file = fs.readFileSync(path.join(srcDirectory(), req.params.name)).toString();
    res.json({
      article: {
        name: req.params.name,
        content: file
      }
    });
  });

  router.post('/article/:name', function(req, res) {
    var filePath = path.join(srcDirectory(), req.params.name);
    fs.writeFileSync(filePath, req.body.content);
    res.send(200);
  });

  router.get('/config', function(req, res) {
    var config = clone(app.get('config'));
    if (config.template) {
      config.template = config.template.toString();
    }
    res.json(config);
  });

  function srcDirectory() {
    return path.join(process.cwd(), app.get('config').srcDirectory);
  }

  return router;
};

