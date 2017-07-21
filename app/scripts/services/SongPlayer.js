(function(){
  function SongPlayer() {
    var SongPlayer = {};

    var currentSong = null;
    var currentBuzzObject = null;

    /**
    * @function setSong
    * @desc Stops currently playing song and loads new audio file as currentBuzzObject
    * @param {Object} song
    **/

    var setSong = function(song){
      if (currentBuzzObject) {
        currentBuzzObject.stop();
        currentSong.playing = null;
      }
      /**
      * @desc Buzz object audio file
      * @type {Object}
      */

    currentBuzzObject = new buzz.sound(song.audioUrl, {
      formats: ['mp3'],
      preload: true
    });
    currentSong = song;
  };

  /**
* @function playSong
* @desc plays currentBuzzObject and sets the playing property of song to true.
* @param {Object} song
*/

  var playSong = function(song){
    currentBuzzObject.play();
    song.playing = true;
  };

  /**
* @function SongPlayer.play
* @desc plays and sets song if current song is null, otherwise just plays song.
* @param {Object} song
*/

    SongPlayer.play = function(song) {
      if (currentSong !== song) {
        setSong(song);
        playSong(song);
    } else if (currentSong === song) {
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
    currentBuzzObject.pause();
    song.playing = false;
  };

    return SongPlayer;
  }

  angular
    .module('blocJams')
    .factory('SongPlayer', SongPlayer);
})();
