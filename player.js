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

Player.prototype.next = function () {
    this.log('next');
    const wasPlaying = this.isPlaying;
    
}

Player.prototype.prev = function () {
    this.log('prev');
    const wasPlaying = this.isPlaying;
    
}

const player = new Player();
const track = {
    "kind": "track",
    "id": 762635683,
    "created_at": "2020/02/18 12:32:51 +0000",
    "user_id": 1817,
    "duration": 4197460,
    "commentable": true,
    "comment_count": 27,
    "state": "finished",
    "original_content_size": 167899517,
    "last_modified": "2020/03/10 19:51:14 +0000",
    "sharing": "public",
    "tag_list": "Melodic Deep Dreaming Hamburg \"Deep House\"",
    "permalink": "la-peninsula",
    "streamable": true,
    "embeddable_by": "all",
    "purchase_url": null,
    "purchase_title": null,
    "label_id": null,
    "genre": "Storytelling",
    "title": "Matthias Kunze | La Península",
    "description": "Vamos a la península!\n\nSC: @matthias-kunze\nIG: https://www.instagram.com/matthkunze\nFB: https://www.facebook.com/MatthiasKunzeSound\n\nKX: @klangextase-1",
    "label_name": null,
    "release": null,
    "track_type": null,
    "key_signature": null,
    "isrc": null,
    "video_url": null,
    "bpm": null,
    "release_year": 2020,
    "release_month": 2,
    "release_day": 20,
    "original_format": "mp3",
    "license": "all-rights-reserved",
    "uri": "https://api.soundcloud.com/tracks/762635683",
    "user": {
        "id": 1817,
        "kind": "user",
        "permalink": "matthias-kunze",
        "username": "Matthias Kunze",
        "last_modified": "2020/02/20 08:08:16 +0000",
        "uri": "https://api.soundcloud.com/users/1817",
        "permalink_url": "https://soundcloud.com/matthias-kunze",
        "avatar_url": "https://i1.sndcdn.com/avatars-000604228797-shabm8-large.jpg"
    },
    "user_uri": "https://api.soundcloud.com/users/1817",
    "permalink_url": "https://soundcloud.com/matthias-kunze/la-peninsula",
    "artwork_url": "https://i1.sndcdn.com/artworks-RcCusqcAdPXZWi89-PILVUw-large.jpg",
    "stream_url": "https://api.soundcloud.com/tracks/762635683/stream",
    "download_url": "https://api.soundcloud.com/tracks/762635683/download",
    "waveform_url": "https://wave.sndcdn.com/83vWmyoh176V_m.png",
    "domain_lockings": null,
    "available_country_codes": null,
    "label": null,
    "secret_token": null,
    "secret_uri": null,
    "user_favorite": null,
    "user_playback_count": null,
    "playback_count": 3462,
    "download_count": 0,
    "favoritings_count": 231,
    "reposts_count": 60,
    "downloadable": false,
    "downloads_remaining": null
};

player.load(track);
