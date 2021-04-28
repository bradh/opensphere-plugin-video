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
      this.controlTopic = $scope['controlTopic'];
      this.player = null;
      goog.Timer.callOnce(this.onWindowOpen_.bind(this), 50);
      $scope.$on(os.ui.WindowEventType.CLOSING, this.onWindowClose_.bind(this));
    }

    onWindowOpen_() {
      var windowId = "video_" + this.src_id;
      this.player = new videojs(windowId, {muted: this.muted});
      // this.player.overlayPlugin({customClass: 'example-class'});
      this.player.src({type: "application/x-mpegURL", src: this.url});
      var Button = videojs.getComponent('Button');
      var htmlMagic = '<div class="modal-body d-flex flex-column flex-fill">' + 
      '<div style="text-align:center">' +
        '<button style="position:absolute; top:0; transform: translate(-50%, 0);" onclick="plugin.video.VideoPlugin.click(\'up\', \'' + this.controlTopic + '\');">' + 
          '<i class="fa fa-arrow-up fa-4x"></i>' +
        '</button>' +
      '</div>' +
      '<div>' +
        '<button style="position:absolute; top:50%; left:0; transform: translate(0, -50%);" onclick="plugin.video.VideoPlugin.click(\'left\', \'' + this.controlTopic + '\');">' + 
          '<i class="fa fa-arrow-left fa-4x"></i>' +
        '</button>' +
        '<button style="position:absolute; top:50%; right:0; transform: translate(0, -50%);" onclick="plugin.video.VideoPlugin.click(\'right\', \'' + this.controlTopic + '\');">' + 
          '<i class="fa fa-arrow-right fa-4x"></i>' +
        '</button>' +
      '</div>' +
        '<button style="position:absolute; bottom:0; left: 50%; transform: translate(-50%, 0);" onclick="plugin.video.VideoPlugin.click(\'down\', \'' + this.controlTopic + '\');">' + 
          '<i class="fa fa-arrow-down fa-4x"></i>' +
        '</button>' +
      '</div>';
      var ManualPTZ = videojs.extend(Button, {
        constructor: function() {
          Button.apply(this, arguments);
          this.addClass('fa');
          this.addClass('fa-arrows');
        },
        handleClick: function() {
          os.ui.window.create({
            'label': 'Camera Manual Control',
            'icon': 'fa fa-arrows',
            'x': 'center',
            'y': 'center',
            'width': '300',
            'min-width': '200',
            'max-width': '400',
            'height': '300',
            'min-height': '200',
            'max-height': '400',
            'modal': 'false',
            'show-close': 'true'
            }, htmlMagic);
        }
      });
      videojs.registerComponent('ManualPTZ', ManualPTZ);
      this.player.getChild('controlBar').addChild('manualPTZ', {});
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
