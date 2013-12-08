/**
 * @fileoverview Default HTTP client.
 */


goog.provide('ydn.client.SimpleClient');
goog.require('ydn.client');
goog.require('ydn.client.SimpleHttpRequest');



/**
 * Singleton simple client.
 * @param {goog.net.XhrManager=} opt_xm xhr manager.
 * @param {Object=} opt_headers optional headers to send with each request.
 * @constructor
 * @implements {ydn.client.Client}
 */
ydn.client.SimpleClient = function(opt_xm, opt_headers) {
  this.xm_ = goog.isDef(opt_xm) ? // use default only if not null.
      opt_xm : ydn.client.getXhrManager();
  /**
   * @type {Object|undefined}
   * @private
   */
  this.header_ = opt_headers;
};


/**
 * @type {goog.net.XhrManager}
 * @private
 */
ydn.client.SimpleClient.prototype.xm_;


/**
 * @inheritDoc
 */
ydn.client.SimpleClient.prototype.request = function(args) {
  if (this.header_) {
    if (!args.headers) {
      args.headers = {};
    }
    for (var key in this.header_) {
      args.headers[key] = this.header_[key];
    }
  }
  return new ydn.client.SimpleHttpRequest(args, this.xm_);
};


/**
 * Get singleton simple client.
 * @return {!ydn.client.SimpleClient}
 */
ydn.client.SimpleClient.getInstance = function() {
  if (!ydn.client.SimpleClient.instance_) {
    ydn.client.SimpleClient.instance_ = new ydn.client.SimpleClient();
  }
  return ydn.client.SimpleClient.instance_;
};


