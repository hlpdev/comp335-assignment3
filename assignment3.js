// Type name(s) here: Hunter Pollock

// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.
var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player('player', {
    height: '390',
    width: '640',
    videoId: '6CGyASDjE-U',
    playerVars: {
      'playsinline': 1
    },
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}

// 4. The API will call this function when the video player is ready.
var ready = false;
function onPlayerReady(event) {
  ready = true;
}

// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var pausedByScroll = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !isInViewport()) {
    player.pauseVideo();
    pausedByScroll = true;
  }
}

function isInViewport() {
  var bounding_rect = document.getElementById('player').getBoundingClientRect();
  return bounding_rect.top >= 0 && bounding_rect.bottom <= window.innerHeight;
}

function checkVideo() {
  if (!ready) return;

  var state = player.getPlayerState();

  if (!isInViewport() && state == YT.PlayerState.PLAYING) {
    player.pauseVideo();
    pausedByScroll = true;
  } else if (isInViewport() && pausedByScroll) {
    player.playVideo();
    pausedByScroll = false;
  }
}

window.addEventListener('scroll', checkVideo);
window.addEventListener('resize', checkVideo);