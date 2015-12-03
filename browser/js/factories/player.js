app.factory('PlayerFactory', function($q) {
	var playerHelper = {};
	playerHelper.pause = function($scope, audio) {
	    audio.pause();
	    $scope.playing = false;
	 }
	playerHelper.play = function(event, song, $scope, audio) {
 	   // stop existing audio (e.g. other song) in any case
 	   playerHelper.pause($scope, audio);
 	   $scope.playing = true;
 	   // resume current song
 	   if (song === $scope.currentSong) return audio.play();
 	   // enable loading new song
 	   $scope.currentSong = song;
 	   audio.src = song.audioUrl;
 	   audio.load();
 	   audio.play();
	}
	return playerHelper;
});
