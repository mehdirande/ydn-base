/**
 * @fileoverview Utilities function for debug.
 *
 * NOTE: these code are stripped using compiler prefix feature.
 * See more detail in tools/strip_debug.txt file.
 *
 * @author kyawtun@yathit.com (Kyaw Tun)
 */

goog.provide('ydn.debug');
goog.provide('ydn.debug.ILogger');

goog.require('goog.debug.Console');
goog.require('goog.debug.DivConsole');
goog.require('goog.debug.LogManager');
goog.require('goog.debug.Logger');
goog.require('goog.events.BrowserEvent'); // cause compile error if not.
goog.require('goog.functions');


/**
 * General debug console
 * @type {goog.debug.Console}
 */
ydn.debug.logger_console = null;


/**
 *
 * @type {goog.debug.DivConsole}
 */
ydn.debug.logger_div = null;


/**
 * @type {goog.debug.Logger} logger.
 */
ydn.debug.logger = goog.debug.Logger.getLogger('ydn.debug');


/**
 * Predefined level are: 'ALL' (0) 'FINEST' (300), 'FINER' (ALL), 'FINE' (500),
 * 'CONFIG' (700), 'INFO' (800), 'WARNING', (900)
 * @param {string=} scope eg: 'ydn.db'.
 * @param {string|number=} level
 * @param {Element=} ele display target DIV. If not provided, it log to console.
 */
ydn.debug.log = function(scope, level, ele) {

  scope = scope || 'ydn';
  var log_level = goog.isNumber(level) ? new goog.debug.Logger.Level(
    'log', level) :
      goog.isString(level) ? goog.debug.Logger.Level.getPredefinedLevel(
        level.toUpperCase()) :
          goog.debug.Logger.Level.FINE;

  goog.debug.Logger.getLogger(scope).setLevel(log_level);


  if (goog.isDef(ele)) {
    if (!ydn.debug.logger_div) {
      ydn.debug.logger_div = new goog.debug.DivConsole(ele);
      ydn.debug.logger_div.setCapturing(true);
      goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.WARNING);
    }
  } else {
    if (!ydn.debug.logger_console && !ydn.debug.logger_div) {
      ydn.debug.logger_console = new goog.debug.Console();
      ydn.debug.logger_console.setCapturing(true);
      goog.debug.LogManager.getRoot().setLevel(goog.debug.Logger.Level.WARNING);
    }
  }
};



/**
 * @interface
 */
ydn.debug.ILogger = function() {};


/**
 * @param {Object} x
 */
ydn.debug.ILogger.prototype.log = function(x) {};


/**
 * @type {ydn.debug.ILogger}
 */
ydn.debug.ILogger.instance = null;


/**
 * Log data.
 * @param {Object} data
 */
ydn.debug.ILogger.log = function(data) {
  if (ydn.debug.ILogger.instance) {
    setTimeout(function() {
      ydn.debug.ILogger.instance.log(data);
    }, 10);
  }
};

