app.factory('PlayerFactory', function($q) {
	var playerHelper = {};
	playerHelper.pause = function($scope, audio) {
	    audio.pause();
	    $scope.playing = false;
	   $scope.$digest();
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
	   $scope.$digest();
	} 
	playerHelper.next = function(){ next($scope, audo) };
	playerHelper.prev = function($rootScope){ $rootScope.$broadcast('prev'); };

  function mod (num, m) { return ((num%m)+m)%m; };

  function skip (val, $scope, audio) {
    if (!$scope.currentSong) return;
    var idx = $scope.album.songs.indexOf($scope.currentSong);
    idx = mod( (idx + (val || 1)), $scope.album.songs.length );
    //$rootScope.$broadcast('play', $scope.album.songs[idx]);
    playerHelper.play(null, $scope.album.songs[idx], $scope, audio);
  };
  function next ($scope, audio) { skip(1, $scope, audio); };
  function prev ($scope, audio) { skip(-1, $scope, audio); };



	return playerHelper;
});
