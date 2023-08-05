
import throttle from 'lodash.throttle';
import Player from '@vimeo/player';

const iframe = document.querySelector('iframe');
const STORAGE = 'videoplayer-current-time';
const player = VimeoPlayer(iframe);

const starTimePlay = localStorage.getItem(STORAGE);
if (starTimePlay) {
  player.setCurrentTime(starTimePlay);
}

const onPlay = function (data) {
  localStorage.setItem(STORAGE, data.seconds);
};

player.on('timeupdate', throttle(onPlay, 1000));


