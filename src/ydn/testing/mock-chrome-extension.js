/**
 * @fileoverview Mock chrome extension api.
 */


goog.provide('ydn.testing.mockExtension');


/**
 * @define {string} extension origin
 */
ydn.testing.mockExtension.BASE_URL = '';


ydn.testing.mockExtension.storage_data_ = {};


ydn.testing.mockExtension.storage_ = {
  'get': function(obj, cb) {
    cb({});
  },
  'set': function(obj, cb) {
    cb({});
  }
};


ydn.testing.mockExtension.Storage = function() {
  this.data_ = {};
};


ydn.testing.mockExtension.Storage.prototype.get = function(name) {
  var obj = {};
  obj[name] = JSON.parse(JSON.stringify(this.data_[name] || null));
};


ydn.testing.mockExtension.Storage.prototype.set = function(name, obj) {
  if (obj) {
    this.data_[name] = JSON.parse(JSON.stringify(obj));
  } else {
    delete this.data_[name];
  }
};


if (!window.chrome) {
  window.chrome = {};
}


if (!chrome.extension) {
  chrome.extension = {
    'getURL': function(s) {
      if (!s) {
        return ydn.testing.mockExtension.BASE_URL;
      } else if (s.charAt(0) != '/' &&
          ydn.testing.mockExtension.BASE_URL.charAt(0) != '/') {
        s = '/' + s;
      } else if (s.charAt(0) == '/' &&
          ydn.testing.mockExtension.BASE_URL.charAt(0) == '/') {
        s = s.substring(1);
      }
      return ydn.testing.mockExtension.BASE_URL + s;
    }
  };
}

if (!chrome.storage) {
  chrome.storage = {
    'sync': new ydn.testing.mockExtension.Storage(),
    'local': new ydn.testing.mockExtension.Storage(),
    'onChanged': {
      'addListener': function() {}
    }
  };
}
