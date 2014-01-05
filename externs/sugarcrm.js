/**
 * @fileoverview About this file
 */


/**
 * @type {Object}
 * @const
 */
var SugarCrm = {};



/**
 * Represents SugarCRM name value list pair.
 * @constructor
 */
SugarCrm.NameValue = function() {};


/**
 * @type {string}
 */
SugarCrm.NameValue.prototype.name;


/**
 * @type {string}
 */
SugarCrm.NameValue.prototype.value;



/**
 * Represents SugarCRM name value list entry.
 * @constructor
 */
SugarCrm.NameValueEntry = function() {};


/**
 * @type {string}
 */
SugarCrm.NameValueEntry.prototype.id;


/**
 * @type {string}
 */
SugarCrm.NameValueEntry.prototype.module_name;


/**
 * @type {Object.<SugarCrm.NameValue>}
 */
SugarCrm.NameValueEntry.prototype.name_value_list;



/**
 * Represents SugarCRM entry.
 * @constructor
 */
SugarCrm.Record = function() {};


/**
 * @type {string}
 */
SugarCrm.Record.prototype.id;


/**
 * @type {string}
 */
SugarCrm.Record.prototype.date_modified;



/**
 * Represents SugarCRM ModuleField.
 * @constructor
 */
SugarCrm.ModuleField = function() {};


/**
 * @type {boolean}
 */
SugarCrm.ModuleField.prototype.calculated;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.group;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.id_name;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.label;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.len;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.name;


/**
 * @type {!Object.<SugarCrm.NameValue>}
 */
SugarCrm.ModuleField.prototype.options;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.related_module;


/**
 * @type {number}
 */
SugarCrm.ModuleField.prototype.required;


/**
 * @type {string}
 */
SugarCrm.ModuleField.prototype.type;



/**
 * Represents SugarCRM ModuleInfo.
 * @constructor
 */
SugarCrm.ModuleInfo = function() {};


/**
 * @type {string}
 */
SugarCrm.ModuleInfo.prototype.module_name;


/**
 * @type {string}
 */
SugarCrm.ModuleInfo.prototype.table_name;


/**
 * @type {!Object.<SugarCrm.ModuleField>}
 */
SugarCrm.ModuleInfo.prototype.module_fields;



/**
 * Represents query format in channel.
 * @constructor
 */
SugarCrm.Query = function() {};


/**
 * @type {string} module name.
 */
SugarCrm.Query.prototype.store;


/**
 * @type {string} field name, use 'id' for primary key.
 */
SugarCrm.Query.prototype.index;


/**
 * @type {string} id.
 */
SugarCrm.Query.prototype.key;


/**
 * @type {{lower: string, upper: string}} id range.
 */
SugarCrm.Query.prototype.keyRange;



/**
 * Represents query result format in channel.
 * @constructor
 * @extends {SugarCrm.Query}
 */
SugarCrm.QueryResult = function() {};


/**
 * @type {Array.<SugarCrm.Record>} result of query.
 */
SugarCrm.Query.prototype.result;


/**
 * @typedef {{
 *   baseUrl: (string|undefined),
 *   domain: (string?|undefined),
 *   userName: (string?|undefined),
 *   isLogin: (boolean|undefined),
 *   flavor: (string|undefined),
 *   version: (string|undefined),
 *   uptime: (string|undefined)
 * }}
 */
SugarCrm.ServerInfo;

