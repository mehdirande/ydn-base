/**
 * @fileoverview Mock pipe.
 *
 */


goog.provide('ydn.msg.MockPipe');
goog.require('ydn.msg.Pipe');



/**
 * Mock provider.
 * @param {ydn.msg.ChannelName} name
 * @param {Object.<Object>} pre_main reply message by req.
 * @param {Object.<Object>=} opt_pre_sugar reply message by req in sugar group channel.
 * @param {Object.<Object>=} opt_pre_by_id reply message by id.
 * @constructor
 * @extends {ydn.msg.Pipe}
 */
ydn.msg.MockPipe = function(name, pre_main, opt_pre_sugar, opt_pre_by_id) {
  goog.base(this, name);
  this.pre = pre_main;
  this.pre_sugar = opt_pre_sugar || {};
  this.pre_by_id = opt_pre_by_id || {};
};
goog.inherits(ydn.msg.MockPipe, ydn.msg.Pipe);


/**
 * @define {number} delay, positive will cause to invoke on setTimeout.
 */
ydn.msg.MockPipe.DELAY = 0;


/**
 * @inheritDoc
 */
ydn.msg.MockPipe.prototype.sendMsg = function(msg) {

  var resp = null;
  if (msg.group_ == 'sugarcrm') {
    resp = this.pre_sugar[msg.req];
  } else {
    resp = this.pre[msg.req];
  }
  if (!resp) {
    resp = this.pre_by_id[msg.id];
  }
  var msg_id = msg.group_ ? msg.group_ + ':' + msg.req : msg.req;
  if (!goog.isDef(resp)) {
    throw new Error('Unprepared message ' + msg_id + ' ' + msg.getId());
  }
  resp = JSON.parse(JSON.stringify(resp));
  if (ydn.msg.Pipe.DEBUG) {
    window.console.log('mock resp: ' + msg_id);
  }
  if (ydn.msg.MockPipe.DELAY > 0) {
    setTimeout(function() {
      var ans = msg.toJSON();
      ans['done'] = true;
      ans['data'] = resp;
      msg.listen(ans);
    }, ydn.msg.MockPipe.DELAY);
  } else {
    var ans = msg.toJSON();
    ans['done'] = true;
    ans['data'] = resp;
    msg.listen(ans);
  }

};


/**
 * Add a mock respond.
 * @param {string} req Message req
 * @param {*} resp
 */
ydn.msg.MockPipe.prototype.addMockRespond = function(req, resp) {
  this.pre[req] = resp;
};


/**
 * Add a mock respond.
 * @param {string} id Message id
 * @param {*} resp
 */
ydn.msg.MockPipe.prototype.addMockRespondById = function(id, resp) {
  this.pre_by_id[id] = resp;
};


/**
 * Add a mock respond.
 * @param {string} req Message req
 * @param {*} resp
 */
ydn.msg.MockPipe.prototype.addMockSugarRespond = function(req, resp) {
  this.pre_sugar[req] = resp;
};

