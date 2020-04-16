goog.provide('plugin.video.VideoOverlay');

goog.require('plugin.video.Video');

const dom = videojs.dom || videojs;
var VideoJSPlugin = videojs.getPlugin('plugin');

var VideoOverlay = videojs.extend(VideoJSPlugin, {

  // el: {},
  constructor: function (player, options) {
    VideoJSPlugin.call(this, player, options);
    this.el = {};

    if (options.customClass) {
      player.addClass(options.customClass);
    }

    player.on('playing', function () {
      this.el = dom.createEl('div', {
        className: `vjs-overlay-item`
      });
      this.el.innerText = "QF776";
      /* TODO: some of this styling could move to CSS */
      this.el.style.position = "absolute";
      this.el.style.color = "white";
      /* TODO: this needs to be derived from the on-screen track position */
      this.el.style.top = "150px";
      this.el.style.left = "200px";
      player.el().appendChild(this.el);
    });
  },
  updateText: function (text) {
    this.el.innerText = text;
  },
  updatePosition: function (x, y) {
    this.el.style.top = x + "px";
    this.el.style.left = y + "px";
  }
});
videojs.registerPlugin('overlayPlugin', VideoOverlay);

plugin.video.VideoOverlay = VideoOverlay;


