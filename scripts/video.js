(function() {
  var $player, autostart, humanTimeToSeconds, jumpToTime, player, ytDeferred;

  autostart = false;

  player = null;

  $player = null;

  ytDeferred = $.Deferred();

  this.onYouTubeIframeAPIReady = function() {
    return ytDeferred.resolve();
  };

  jumpToTime = function(humanTime) {
    var numSeconds;
    numSeconds = humanTimeToSeconds(humanTime);
    return player.seekTo(numSeconds, true);
  };

  humanTimeToSeconds = function(humanTime) {
    var element, result, _i, _len, _ref;
    result = 0;
    _ref = humanTime.split(":");
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      element = _ref[_i];
      result = (result * 60) + parseInt(element, 10);
    }
    return result;
  };

  $(function() {
    var setSize;
    $player = $('#player');
    ytDeferred.then(function() {
      return player = new YT.Player('player', {
        videoId: $player.data().videoId,
        events: {
          'onReady': function(event) {
            $player = $('#player');
            if (autostart) {
              return event.target.playVideo();
            }
          }
        }
      });
    });
    $("a.marker-time").on('click', function(event) {
      event.preventDefault();
      return jumpToTime($(event.target).data().humanTimecode);
    });
    setSize = function(size) {
      return function(event) {
        event.preventDefault();
        return $player.attr('class', size);
      };
    };
    $("a[name=player-small]").on('click', setSize("small"));
    $("a[name=player-medium]").on('click', setSize("medium"));
    return $("a[name=player-large]").on('click', setSize("large"));
  });

}).call(this);
