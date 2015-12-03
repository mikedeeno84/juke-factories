app.factory('PlayerFactory', function($q) {
	var playerHelper = {};
  	var audio = document.createElement('audio');
  	playerHelper.playlist = [];
  	playerHelper.playing = false;
  	playerHelper.currentSong;
  	playerHelper.setPlaylist = function(newPlaylist){
  		playerHelper.playlist = newPlaylist;
  	}

	playerHelper.pause = function() {
	    audio.pause();
	    playerHelper.playing = false;
	 }
	playerHelper.play = function(song) {
 	   // stop existing audio (e.g. other song) in any case
 	   playerHelper.pause();
 	   playerHelper.playing = true;
 	   // resume current song
 	   if (song === playerHelper.currentSong) return audio.play();
 	   // enable loading new song
 	   playerHelper.currentSong = song;

 	   audio.src = song.audioUrl;
 	   audio.load();
 	   audio.play();
	} 
	playerHelper.next = function(){ skip(1); };
	playerHelper.prev = function(){ skip(-1); };

  function mod (num, m) { return ((num%m)+m)%m; };

  function skip (val) {
    if (!playerHelper.currentSong) return;
    var idx = playerHelper.playlist.indexOf(playerHelper.currentSong);
    idx = mod( (idx + (val || 1)), playerHelper.playlist.length );
    playerHelper.play(playerHelper.playlist[idx]);
  };

	return playerHelper;
});
