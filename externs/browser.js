/**
 * @fileoverview About this file.
 * User: mbikt
 * Date: 4/24/12
 * @externs
 */

/**
 *
 * @type {Object}
 */
var JSON = {};


/**
 *
 * @param {string} str
 * @return {Object}
 */
JSON.parse = function (str) {};

/**
 *
 * @param {Object} obj
 * @return {string}
 */
JSON.stringify = function (obj) {};


/**
* Socket IO
* @constructor
*/
function Socket() {}

/**
* @param {string} channel
* @param {Function} listener
*/
Socket.prototype.on = function(channel, listener) {};

/**
* @param {string} channel
* @param {Object} obj
*/
Socket.prototype.emit = function(channel, obj) {};

/**
* Socket IO service
* @constructor
*/
function io() {}

/**
* @param {string} server
* @return {Socket}
*/
io.prototype.connect = function(server) {};


/**
 * New IndexedDB interface not in closure externs.
 * This must be remove when they updated.
 * @constructor
 */

/**
 * @extends {IDBRequest}
 * @constructor
 */
var IDBOpenDBRequest = function() {};

/**
 *
 * @param ev
 */
IDBOpenDBRequest.prototype.onblocked = function(ev) {};

/**
 *
 * @param ev
 */
IDBOpenDBRequest.prototype.onupgradeneeded = function(ev) {};


/**
 * @final
 * @type {boolean}
 */
IDBIndex.prototype.multiEntry;



/**
 * @final
 * @type {boolean}
 */
IDBObjectStore.prototype.autoIncrement;
//
//
///**
// * Closure compiler incorrectly define as Array.<string>
//* @final
//* @type {DOMStringList}
//*/
//IDBDatabase.prototype.objectStoreNames;