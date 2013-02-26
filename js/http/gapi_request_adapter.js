/**
 * @fileoverview GAPI request adapter.
 */

goog.provide('ydn.http.GapiRequestAdapter');
goog.require('ydn.http.Transport');
goog.require('goog.functions');


/**
 *
 * @param {{request: Function}} gapi_client GAPI client object.
 * @constructor
 * @extends {ydn.http.Transport}
 */
ydn.http.GapiRequestAdapter = function(gapi_client) {
  goog.base(this);
  goog.asserts.assertFunction(gapi_client['request']);
  this.gapi_client = gapi_client;
};
goog.inherits(ydn.http.GapiRequestAdapter, ydn.http.Transport);


/**
 * @type {{request: Function}}
 */
ydn.http.GapiRequestAdapter.prototype.gapi_client;


/**
 *
 * @param {!Object} gapi_client
 * @return {ydn.http.Transport}
 */
ydn.http.GapiRequestAdapter.wrap = function(gapi_client) {
  if (gapi_client instanceof ydn.http.Transport) {
    return gapi_client;
  } else if ('request' in gapi_client) {
    return new ydn.http.GapiRequestAdapter(
      /** @type {{request: Function}} */ (gapi_client));
  } else {
    throw new ydn.debug.error.ArgumentException('transport required');
  }
};



/**
 * Submit HTTP request.
 *
 * @param {string} url
 * @param {function(ydn.http.CallbackResult)=} opt_callback
 * @param {ydn.http.ITransport.Options=} options
 * @return {goog.async.Deferred|undefined} if not provided, callback result
 * is return in the deferred function.
 * @override
 */
ydn.http.GapiRequestAdapter.prototype.send =  function(url, opt_callback, options) {
  options = ydn.http.getDefaultOptions(options);
  opt_callback = opt_callback || goog.functions.TRUE;
  var callback_adapter = function(json, raw) {
    opt_callback = undefined;
    if (json) {
      return new ydn.http.CallbackResult('application/json', '', url, 200, json);
    } else {
      var content_type = raw.headers['Content-Type'];
      return new ydn.http.CallbackResult(content_type, raw['body'], url,
          raw['status']);
    }
  };
  this.gapi_client['request']({
    'path': url,
    'method': options.method,
    'params': options.params,
    'headers': options.headers,
    'body': options.body,
    'callback': callback_adapter
  })
};
