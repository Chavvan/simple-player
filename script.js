let playerArea = document.querySelector('.myplayer');
let media = playerArea.querySelector('video');
let controls = playerArea.querySelector('.myplayer__controls');

let play = controls.querySelector('.play');
let rewind = controls.querySelector('.rewind');
let forward = controls.querySelector('.forward');
let volumeIcon = controls.querySelector('.volume .icon');
let volumeProgressBar = controls.querySelector('.volume .volume__progress');
let volumeProgressBarInput = volumeProgressBar.querySelector("input");
let fullscreen = controls.querySelector('.fullscreen');

play.addEventListener('click', function () {
    videoTime.textContent = getTime(media.duration);
    if (media.paused) {
        togglePlayIcon();
        media.play();
    } else {
        togglePlayIcon();
        media.pause();
    }
});

function togglePlayIcon() {
    let icon = play.querySelector("i");
    icon.classList.toggle('ion-md-pause');
    icon.classList.toggle('ion-md-play');
}

rewind.addEventListener('click', function () {
    media.currentTime = media.currentTime - 5;
});
forward.addEventListener('click', function () {
    media.currentTime = media.currentTime + 5;
});

let timerArea = controls.querySelector('.timer');
let currentTime = timerArea.querySelector(".currentTime");
let videoTime = timerArea.querySelector(".videoTime");
let timerBar = controls.querySelector(".controls__progressbar-current");

media.addEventListener('timeupdate', function () {
    currentTime.textContent = getTime(media.currentTime);
    let barLength = Math.floor((media.currentTime / media.duration) * 100);
    timerBar.style = `background: linear-gradient(90deg, rgba(230, 126, 34, 1), ${barLength}%, #e1e1e1 0%)`;
    timerBar.value = barLength;
    if (barLength == 100)
        togglePlayIcon();
});

function getTime(time) {
    let minutes = Math.floor(time / 60);
    let second = Math.floor(time - (minutes * 60));
    let minuteValue;
    let secondValue;
    if (minutes < 10)
        minuteValue = '0' + minutes;
    else minuteValue = minutes;
    if (second < 10)
        secondValue = '0' + second;
    else secondValue = second;
    return minuteValue + ':' + secondValue;
};

timerBar.addEventListener('input', function () {
    media.currentTime = Math.floor((this.value / 100) * media.duration);
});

volumeIcon.addEventListener('click', function () {
    volumeProgressBar.classList.toggle('active');
});

volumeProgressBarInput.addEventListener('input', function () {
    media.volume = this.value / 100;
});

fullscreen.addEventListener('click', function () {
    if (!document.fullscreenElement) {
        if (playerArea.requestFullscreen) {
            playerArea.requestFullscreen();
        } else if (playerArea.mozFullScreenElement) {
            playerArea.mozFullScreenElement();
        } else if (playerArea.msFullScreenElement) {
            playerArea.msFullScreenElement();
        } else if(playerArea.webkitFullScreenElement) {
            playerArea.webkitFullScreenElement();
        }
    } else {
        if (document.exitFullscreen)
            document.exitFullscreen();
    }
});