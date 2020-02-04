// os.mock sets up a bunch of basic opensphere APIs, like settings, which is
// used in our plugin
goog.require('os.mock');
goog.require('plugin.video.VideoPlugin');

describe('plugin.video.VideoPlugin', function() {
  it('should have the proper ID', function() {
    expect(new plugin.video.VideoPlugin().id).toBe('video');
  });
});
