goog.provide('plugin.video.VideoPlugin');

goog.require('os.plugin.AbstractPlugin');
goog.require('os.plugin.PluginManager');
goog.require('os.ui.Module');
goog.require('os.ui.window');
goog.require('plugin.video.Video');
goog.require('plugin.video.VideoOverlay');


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
  // "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
  /*
  plugin.video.VideoPlugin.prototype.playVideoInWindow(
    // "http://192.168.32.100:8091/stream/9f3ba172-75c0-4868-bf04-6e7abdc551ba/index.m3u8",
    "https://d2zihajmogu5jn.cloudfront.net/bipbop-advanced/bipbop_16x9_variant.m3u8",
    "Bip Bop Example",
    "video2",
    "muted"
    );
    */
};

/**
 * Play a HTTP streaming video in a popup window
 *
 * @param {string} url the URL to play from
 * @param {string} windowLabel a readable label for the window (caption)
 * @param {string} id window id.
 * @param {string|boolean|undefined} muted whether to mute the audio (needs to be truthy if no user interaction)
 * @param {!string|undefined} controlTopic the camera control topic (null if no control available)
 */
plugin.video.VideoPlugin.prototype.playVideoInWindow = function(url, windowLabel, id, muted, controlTopic) {
  if (os.ui.window.exists(id)) {
    os.ui.window.bringToFront(id);
    return;
  }
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
  }, 'videocontrol', undefined, undefined, undefined, {url: url, muted: muted, src_id: id, controlTopic: controlTopic});
};

/**
 * Handle PTZ click event
 * @param {string} direction which direction to move
 * @param {string} controlTopic the camera control topic
 */
plugin.video.VideoPlugin.click = function(direction, controlTopic) {
  console.log(controlTopic + " - " + direction);
  var tilt = 0.0;
  var pan = 0.0;
  var zoom = 0.0;
  if (direction === 'up') {
    tilt += 3.01;
  }
  if (direction === 'down') {
    tilt -= 3.01;
  }
  if (direction === 'left') {
    pan -= 3.01;
  }
  if (direction === 'right') {
    pan += 3.01;
  }
  var command = {
    "records":
      [{
        "value": {
          'command': "RelativePanTiltZoomRequest",
          'tiltDegrees':tilt,
          'panDegrees':pan,
          'zoomPercent':zoom,
          'requestingController': "Opensphere-FIXME"
        }
      }]
  };
  plugin.sbtracks.TracksPlugin.sendKafkaCommand_(controlTopic, command)
};

// add the plugin to the application
os.plugin.PluginManager.getInstance().addPlugin(new plugin.video.VideoPlugin());
