Gunnlöð
=======

Gunnlod is a slick interface to edit a folder of markdown files.

- The preview is an actual for real life preview. Its in an iframe with
  your own stylesheets.

- You can also provide a custom template for the preview to add any
  extra stuff that your website adds around your content to make the
  preview even more accurate.

- It just takes a folder of markdown files, so you can use it with any
  static site builder, it has nothing to do with the build.

In other words, its everything you've always wanted in a guardian goddes
of your mead of poetry.

![demo](http://recordit.co/66MDtelho8.gif)

Installation
------------

`npm install gunnlod -g`

Command Line Usage
------------------

1. Make a gunnlod.js in the directory you want to run gunnlod.

2. Export some stuff:

   ```js
   // the directory to find the articles in, relative to the
   // `process.pwd()`.
   exports.srcDirectory = 'path/to/articles';

   // these will be used in the preview
   exports.stylesheets = [
     'something.css',
     'http://example.com/whatever.css'
   ];

   // Optional, this will be the output in the preview, its built with
   // React so ... welcome to React!
   exports.template = function(React, meta, content) {
     // meta contains the header meta of your markdown file
     // content is the html.
     return React.DOM.div({className: 'container'}, [
       React.DOM.h1(null, meta.title),
       React.DOM.div(null, React.DOM.time(null, meta.pubdate)),
       React.DOM.hr(),
       // this part is really important, do it like this
       React.DOM.div({dangerouslySetInnerHTML: {__html: content}})
     ]);
   };
   ```

3. Run it! `$ gunnlod` or `$ gunnlod <port>`

Programmatic Usage
------------------

Set up your own gunnlod server:

```js
var gunnlod = require('gunnlod');
gunnlod.set('config', {
  // same as gunnlod.js config file from cli usage
  srcDirectory: '',
  stylesheets: [],
  template: function() {}
});
gunnlod.listen(3000);
```

Markdown Support
----------------

This uses [meta-marked](https://github.com/j201/meta-marked), which
means you can have metadata in the head of the file.

```md
---
title: foo
pubdate: 2014-05-20
---

Here is the content
```

License and Copyright
---------------------

Copyright 2014 Ryan Florence
MIT Style license

