goog.module('plugin.video.Video');
goog.module.declareLegacyNamespace();

goog.require('plugin.video.defines');
goog.require('goog.Timer');

class Controller {
    /**
     * @param {!angular.Scope} $scope The Angular scope.
     * @param {!angular.JQLite} $element The root DOM element.
     * @ngInject
     */
    constructor($scope, $element) {
      this.url = $scope['url'];
      this.muted = $scope['muted'];
      this.src_id = $scope['src_id'];
      this.player = null;
      goog.Timer.callOnce(this.onWindowOpen_.bind(this), 50);
      $scope.$on(os.ui.WindowEventType.CLOSING, this.onWindowClose_.bind(this));
    }

    onWindowOpen_() {
      var windowId = "video_" + this.src_id;
      this.player = new videojs(windowId, {muted: this.muted});
      this.player.overlayPlugin({customClass: 'example-class'});
      this.player.src({type: "application/x-mpegURL", src: this.url});
      this.player.play();
    }

    onWindowClose_() {
      if (this.player) {
        this.player.dispose();
      }
    }
}

const directive = () => ({
  restrict: 'E',
  replace: true,
  scope: true,
  templateUrl: plugin.video.ROOT + 'views/video.html',
  controller: Controller,
  controllerAs: 'videoControl'
});

exports = {Controller, directive};
