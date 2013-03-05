/**
 * @fileoverview About this file.
 *
 * User: kyawtun
 * Date: 21/9/12
 */


/**
 *
 * @constructor
 */
var AtomText = function() {};

/**
 * @type {string}
 */
AtomText.prototype.$t;


/**
 *
 * @constructor
 */
var AtomLink = function() {};

/**
 * @type {string}
 */
AtomLink.prototype.rel;

/**
 * @type {string}
 */
AtomLink.prototype.href;

/**
 * @type {string}
 */
AtomLink.prototype.type;

/**
 * @type {string}
 */
AtomLink.prototype.$t;



/**
 *
 * @constructor
 */
var AtomCategory = function() {};

/**
 * @type {string}
 */
AtomCategory.prototype.term;

/**
 * @type {string|undefined}
 */
AtomCategory.prototype.scheme;

/**
 * @type {string|undefined}
 */
AtomCategory.prototype.label;


/**
 *
 * @constructor
 */
var AtomPerson = function() {};

/**
 * @type {AtomText}
 */
AtomPerson.prototype.name;

/**
 * @type {AtomText}
 */
AtomPerson.prototype.uri;

/**
 * @type {AtomText}
 */
AtomPerson.prototype.email;


/**
 * either contains, or links to, the complete content of the entry.
 * @constructor
 */
var AtomContent = function() {};

/**
 * @type {string}
 */
AtomContent.prototype.src;

/**
 * @type {string}
 */
AtomContent.prototype.type;

/**
 * @type {string}
 */
AtomContent.prototype.$t;


/**
 * http://www.atomenabled.org/developers/syndication/#requiredEntryElements
 * @constructor
 */
var Atom = function() {};

/**
 * @type {AtomText}
 */
Atom.prototype.id;

/**
 * @type {AtomText}
 */
Atom.prototype.title;

/**
 * @type {AtomText}
 */
Atom.prototype.updated;


/**
 * @type {!AtomLink|!Array.<AtomLink>|undefined}
 */
Atom.prototype.link;

/**
 * @type {!Array.<!AtomCategory>|undefined}
 */
Atom.prototype.category;


/**
 * @type {AtomPerson|undefined}
 */
Atom.prototype.author;

/**
 * @type {AtomContent|undefined}
 */
Atom.prototype.content;


/**
 * @type {AtomText|undefined}
 */
Atom.prototype.summary;



/**
 *
 * @extends {Atom}
 * @constructor
 */
var AtomEntry = function() {};



/**
 * @extends {Atom}
 * @constructor
 */
var AtomFeed = function() {};



