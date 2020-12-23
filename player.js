function Player(trackList) {
    this.id = Math.round(Math.random() * 1000);

    // audio player
    this.audio = new Audio();

    // initialize defaults
    this.setTrackList(trackList);
    this.currentIndex = -1;
    this.currentTrack = null;
    this.isPlaying = false;

    this.log('init');

    this.audio.addEventListener('timeupdate', ({ target }) => {
        const position = target.currentTime;
        this.log(`time: ${position} sec`);
    }, false);

    this.audio.addEventListener('progress', ({ target }) => {
        const buffer = ((target.buffered.length && target.buffered.end(0)) / target.duration) * 100;
        this.log(`buffered: ${buffer}%`);
    }, false);
}

Player.prototype.log = function () {
    window.console.log.apply(window.console, [`Player #${this.id}: `, ...arguments]);
}

Player.prototype.setTrackList = function (trackList) {
    this.trackList = trackList;
    this.playOrder = trackList.map((_, index) => index);
}

Player.prototype.setPostion = function (pos) {
    this.audio.currentTime = pos;
}

Player.prototype.loadTrack = function (orderIndex) {
    const trackIndex = this.playOrder[orderIndex];
    if (trackIndex === undefined) {
        return;
    }
    this.currentIndex = orderIndex;
    this.currentTrack = this.trackList[trackIndex];
    this.audio.src = `${this.currentTrack.stream_url}?consumer_key=${document.apiKey}`;
    this.audio.load();
}

Player.prototype.shuffle = function () {
    const playOrder = [...this.playOrder];

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    shuffleArray(playOrder);
    this.playOrder = playOrder;
}

Player.prototype.load = function (orderIndex) {
    const wasPlaying = this.isPlaying;

    this.stop();
    if (this.currentIndex !== orderIndex) {
        this.loadTrack(orderIndex);
    }

    if (wasPlaying) {
        this.play();
    }
}

Player.prototype.play = function () {
    this.audio.play();
    this.isPlaying = true;
}

Player.prototype.pause = function () {
    this.audio.pause();
    this.isPlaying = false;
}

Player.prototype.stop = function () {
    this.pause();
    this.setPostion(0);
}

Player.prototype.next = function () {
    const nextIndex = this.currentIndex + 1;
    this.load(nextIndex);
}

Player.prototype.prev = function () {
    const prevIndex = (this.audio.currentTime > 3) ? this.currentIndex : this.currentIndex - 1;
    this.load(prevIndex);
}