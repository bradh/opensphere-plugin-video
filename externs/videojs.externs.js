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
