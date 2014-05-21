exports.getJSON = function(url, cb) {
  var req = new XMLHttpRequest();
  req.onload = function() {
    cb(JSON.parse(req.response));
  };
  req.open('GET', url);
  req.send();
};

exports.postJSON = function(url, obj, cb) {
  var req = new XMLHttpRequest();
  req.onload = function() {
    cb(req.response);
  };
  req.open('POST', url);
  req.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
  req.send(JSON.stringify(obj));
};

