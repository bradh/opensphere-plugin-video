goog.provide('plugin.video.VideoPlugin');

goog.require('os.plugin.AbstractPlugin');
goog.require('os.plugin.PluginManager');
goog.require('os.ui.Module');
goog.require('os.ui.window');
goog.require('plugin.video.Video');


/**
 * Provides a video plugin.
 * @extends {os.plugin.AbstractPlugin}
 * @constructor
 */
plugin.video.VideoPlugin = function() {
  plugin.video.VideoPlugin.base(this, 'constructor');
  this.id = plugin.video.ID;
  this.errorMessage = null;
};
goog.inherits(plugin.video.VideoPlugin, os.plugin.AbstractPlugin);

/**
 * @type {string}
 * @const
 */
plugin.video.ID = 'video';

os.ui.Module.directive('videocontrol', [plugin.video.Video.directive]);

/**
 * @inheritDoc
 */
plugin.video.VideoPlugin.prototype.init = function() {
  this.playVideoInWindow(
      'https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8',
      'Bip Bop Example',
      'video2',
      'muted'
  );
};

/**
 * Play a HTTP streaming video in a popup window
 *
 * @param {string} url the URL to play from
 * @param {string} windowLabel a readable label for the window (caption)
 * @param {string} id window id.
 * @param {string|boolean|undefined} muted whether to mute the audio (needs to be truthy if no user interaction)
 */
plugin.video.VideoPlugin.prototype.playVideoInWindow = function(url, windowLabel, id, muted) {
  os.ui.window.create({
    'id': id,
    'x': 'center',
    'y': 'center',
    'label': windowLabel,
    'show-close': true,
    'no-scroll': true,
    'min-width': 640,
    'min-height': 600,
    'max-width': 1280,
    'max-height': 720,
    'modal': false,
    'width': 640,
    'height': 600,
    'icon': 'fa fa-camera'
  }, 'videocontrol', undefined, undefined, undefined, {url: url, muted: muted});
};

// add the plugin to the application
os.plugin.PluginManager.getInstance().addPlugin(new plugin.video.VideoPlugin());
