goog.module('plugin.video.Video');
goog.module.declareLegacyNamespace();

goog.require('plugin.video.defines');

class Controller {
    /**
     * @param {!angular.Scope} $scope The Angular scope.
     * @param {!angular.JQLite} $element The root DOM element.
     * @ngInject
     */
    constructor($scope, $element) {
      this.url = $scope['url'];
      this.muted = $scope['muted'];
      this.player = null;
      $scope.$on(os.ui.WindowEventType.CLOSING, this.onWindowClose_.bind(this));
    }

    $onInit() {
      this.player = new videojs('video_2', {muted: this.muted});
      this.player.overlayPlugin({customClass: 'example-class'});
      this.player.src({type: "application/x-mpegURL", src: this.url});
      this.player.play();
    }

    onWindowClose_() {
      this.player.dispose();
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
