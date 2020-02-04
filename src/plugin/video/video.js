goog.module('plugin.video.Video');
goog.module.declareLegacyNamespace();

goog.require('plugin.video.defines');

class Controller {
    constructor($scope, $element) {
        this.url = $scope['url'];
        this.muted = $scope['muted'];
    }
    $onInit() {
        let player = new videojs('video_2', { muted: this.muted });
        player.src({ type: "application/x-mpegURL", src: this.url });
        player.play();
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

exports = { Controller, directive };