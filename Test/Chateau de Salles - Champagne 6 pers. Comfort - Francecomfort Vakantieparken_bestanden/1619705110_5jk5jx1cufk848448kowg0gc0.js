    (function($, window, document, undefined) {
      // Article template: video
      (function() {

        var playingClassName = 'at-video--playing',
            bufferingClassName = 'at-video--buffering',
            initializingClassName = 'at-video--initializing',
            initializedClassName = 'at-video--initialized';

        var initVideoPlayer = function($container, _options) {

          var $element = $container.find('.at-video__player'),
              options = $.extend({}, _options);

          $container.addClass(initializingClassName);

          $element.ytplayer({
            videoId: $element.data('videoId'),
            playerVars: {
              mute: 0,
              autoplay: options.autoplay,
              controls: 1,
              disablekb: 1,
              showInfo: 0,
            }
          });

          $element.on('ytplayer:ready', function(event, ytevent, player) {
            $container.removeClass(initializingClassName);
            $container.addClass(initializedClassName);
          });

          $element.on('ytplayer:statechange', function(event, ytevent, player) {
            if (ytevent.data === YT.PlayerState.BUFFERING) {
              $container.addClass( bufferingClassName );  // Hide preview image
            }else if (ytevent.data === YT.PlayerState.PLAYING) {
              $container.addClass( playingClassName );
            }else if (ytevent.data === YT.PlayerState.ENDED || ytevent.data === YT.PlayerState.PAUSED) {
              $container.removeClass( playingClassName );
            }
          });

          return $element;
        };

        var $videos = $('.at-video');

        if ($videos.length) {

          // console.log('ik heb video');

          $.hm.libloader.add('hm.ytplayer').done(function() {
            $('.at-video').each(function() {
              var $container = $(this);

              var ytvideo;

              var initVideo = function(options) {
                initVideoPlayer( $container, options ).on('ytplayer:ready', function(event, ytevent, player) {
                  ytvideo = player;
                  // If the video is not playing, try to start it
                  if (options.autoplay && ytvideo.getPlayerState() !== YT.PlayerState.PLAYING) {
                    ytvideo.playVideo();
                  }
                });
              };

              // Auto load the video if no preview image exists
              if (!$container.find('.at-video__preview').length) {
                initVideo({ autoplay: 0 });
              }

              $container.find('.at-video__button').on('click', function() {
                if (ytvideo) {
                  ytvideo.playVideo();
                  $container.find('.at-video__preview-img').remove();
                }else{
                  initVideo({ autoplay: 1 });
                  $container.find('.at-video__preview-img').remove();
                }
              });

            });
          });

        }

      }());
}(window.jQuery, window, document));