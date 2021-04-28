/**
 * @fileoverview Externs for the video.js library.
 * @externs
 */

/**
 * Namespace for typedefs.
 * @type {Object}
 */
var vjs = {};


/**
 * @typedef {{
 *   muted: (string|boolean|undefined)
 * }}
 */
vjs.VJSOptions;


/**
 * video.js constructor.
 * @param {string} id
 * @param {vjs.VJSOptions} options
 * @constructor
 */
var videojs = function(id, options) {};


/**
 * Play function
 */
videojs.prototype.play = function() {};

/**
 * Dispose function
 */
videojs.prototype.dispose = function() {};

/**
 * Logger function.
 * @param {string} message
 */
videojs.log = function(message) {};

/**
 * Plugin getter function.
 * @param {string} className
 */
videojs.getPlugin = function(className) {};

/**
 * Plugin extension point
 * @param {Component} superClass
 * @param {Object} subClassMethods
 */
videojs.extend = function(superClass, subClassMethods) {};

/**
 * Plugin registration function
 * @param {string} name
 * @param {Function} plugin
 */
videojs.registerPlugin = function(name, plugin) {};

/**
 * Our overlay specific plugin init
 * @param {Object} configuration
 */
videojs.prototype.overlayPlugin = function(configuration) {};

/**
 * Player child getter function.
 * @param {string} childName
 */
videojs.prototype.getChild = function(childName) {};

/**
 * Player constructor
 * @param {Element} tag
 * @param {Object} optionsopt
 * @constructor
 */
var Player = function(tag, optionsopt) {};

/**
 * Component constructor
 * @param {Player} player
 * @param {Object} optionsopt
 * @constructor
 */
var Component = function(player, optionsopt) {};

/**
 * Call superclass.
 * @param {Component} parent
 * @param {Object} args
 */
Component.prototype.apply = function(parent, args) {};

/**
 * Component getter function.
 * @param {string} name
 * @returns {Component}
 */
videojs.getComponent = function(name) {};

/**
 * Component registration function
 * @param {string} name
 * @param {Component} component
 */
videojs.registerComponent = function(name, component) {};