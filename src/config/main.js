
goog.provide('ydn.base.exports');
goog.require('goog.async.Deferred');

goog.exportProperty(goog.async.Deferred.prototype, 'done',
    goog.async.Deferred.prototype.addCallback);
goog.exportProperty(goog.async.Deferred.prototype, 'fail',
    goog.async.Deferred.prototype.addErrback);
goog.exportProperty(goog.async.Deferred.prototype, 'then',
    goog.async.Deferred.prototype.addCallbacks);
goog.exportProperty(goog.async.Deferred.prototype, 'always',
    goog.async.Deferred.prototype.addBoth);

