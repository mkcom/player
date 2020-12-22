function Player() {
    this.id = Math.round(Math.random() * 1000);

    // audio player
    this.audio = new Audio();

    // initialize defaults
    this.track = null;
    this.position = 0;
    this.isPlaying = false;

    this.log = function (message) {
        console.log(`Player #${this.id}: `, message);
    }

    this.log('initialized');
}

Player.prototype.setTrack = function (track) {
    this.track = track;
    this.log(`-> track "${track.title}" set`);

    this.audio.src = `${this.track.stream_url}?consumer_key=${document.apiKey}`;
    this.log(`-> audio source set to "${this.track.stream_url}"`);
}

Player.prototype.setPostion = function (pos) {
    this.audio.currentTime = pos;
    this.position = pos;
    this.log(`-> position set to ${pos}`);
}

Player.prototype.load = function (track) {
    this.log('load');
    const wasPlaying = this.isPlaying;

    this.stop();
    this.setTrack(track);

    if (wasPlaying) {
        this.play();
    }
}

Player.prototype.play = function () {
    this.log('play');
    this.audio.play();
    this.isPlaying = true;
}

Player.prototype.pause = function () {
    this.log('pause');
    this.audio.pause();
    this.isPlaying = false;
}

Player.prototype.stop = function () {
    this.log('stop');
    this.pause();
    this.setPostion(0);
}