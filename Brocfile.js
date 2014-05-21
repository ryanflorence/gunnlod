var jsx = require('broccoli-react');
var browserify = require('broccoli-browserify');
var pickFiles = require('broccoli-static-compiler');
var mergeTrees = require('broccoli-merge-trees');
var uglify = require('broccoli-uglify-js');
var prod = process.env.NODE_ENV == 'production';

module.exports = mergeTrees([assets(), app()]);

function app() {
  var app = browserify(jsx('client/js'), {
    entries: ['./main.js'],
    outputFile: 'application.js',
    bundle: {
      debug: !prod
    }
  });
  return prod ? uglify(app, {
    mangle: true,
    compress: true
  }) : app;
}

function assets() {
  return pickFiles('client', {
    srcDir: './',
    files: ['**/*.html', '**/*.css'],
    destDir: './'
  });
}

