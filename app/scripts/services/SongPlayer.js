(function(){
  function SongPlayer(Fixtures) {
    var SongPlayer = {};
    var currentAlbum = Fixtures.getAlbum();
    var currentBuzzObject = null;


    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    **/

    var setSong = function(song){
      if (currentBuzzObject) {
        stopSong();
      }
      /**
      * @desc Buzz object audio file
      * @type {Object}
      */

    currentBuzzObject = new buzz.sound(song.audioUrl, {
      formats: ['mp3'],
      preload: true
    });
      SongPlayer.currentSong = song;
  };

  /**
* @function playSong
* @desc plays currentBuzzObject and sets the playing property of song to true.
* @param {Object} song
*/

  var stopSong = function(){
    currentBuzzObject.stop();
    SongPlayer.currentSong.playing = null;
  };

  var playSong = function(song){
    currentBuzzObject.play();
    song.playing = true;
  };

  /**
* @desc returns index of a song.
*/

  var getSongIndex = function(song){
    return currentAlbum.songs.indexOf(song);
  };

  /**
  * @desc Active song object from list of songs
  * @type {Object}
  */
  SongPlayer.currentSong = null;
  SongPlayer.currentAlbum = Fixtures.getAlbum();

  /**
* @function SongPlayer.play
* @desc plays and sets song if current song is null, otherwise just plays song.
* @param {Object} song
*/

    SongPlayer.play = function(song) {
      song = song || SongPlayer.currentSong;
      if (SongPlayer.currentSong !== song) {
        setSong(song);
        playSong(song);
    } else if (SongPlayer.currentSong === song) {
        if (currentBuzzObject.isPaused()) {
          playSong(song);
        }
    }
};

/**
* @function SongPlayer.pause
* @desc pauses currentBuzzObject and sets playing property of song to false;
* @param {Object} song
*/

  SongPlayer.pause = function(song) {
    song = song || SongPlayer.currentSong;
    currentBuzzObject.pause();
    song.playing = false;
  };

  /**
  * @function SongPlayer.previous
  * @desc Uses SongPlayer.currentSong to subtract 1 from the current
  * @param none
  */

  SongPlayer.previous = function(){
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex--;

    if (currentSongIndex < 0){
      stopSong();
    } else {
      var song = currentAlbum.songs[currentSongIndex];
      setSong(song);
      playSong(song);
    }
  };

  SongPlayer.next = function() {
    var currentSongIndex = getSongIndex(SongPlayer.currentSong);
    currentSongIndex++;

    if (currentSongIndex >= currentAlbum.songs.length){
      currentSongIndex = 0;
    }
    var song = currentAlbum.songs[currentSongIndex];
    setSong(song);
    playSong(song);
  };

    return SongPlayer;
  }



  angular
    .module('blocJams')
    .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();
