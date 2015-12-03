app.factory('StatsFactory', function ($q) {
	var statsObj = {};
	statsObj.totalTime = function (album) {
	     var audio = document.createElement('audio');
	        return $q(function (resolve, reject) {
	            var sum = 0;
	            var n = 0;
	            function resolveOrRecur () {
	                 if (n >= album.songs.length) resolve(sum);
	                 else audio.src = album.songs[n++].audioUrl;
	            }
	            audio.addEventListener('loadedmetadata', function () {
	               sum += audio.duration;
	               resolveOrRecur();
	            });
	        resolveOrRecur();
	    });
    };
    return statsObj;
});



app.controller('AlbumCtrl', function($scope, $http, $rootScope, StatsFactory, PlayerFactory) {

  // load our initial data
  $http.get('/api/albums/')
  .then(res => $http.get('/api/albums/' + res.data[1]._id)) //change index to 0 is you are Everett
  .then(res => res.data)
  .then(album => {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function(song){
      song.audioUrl = '/api/songs/' + song._id + '.audio';
    });
    PlayerFactory.setPlaylist(album.songs);
    $scope.album = album;
  }).then(function() {
        StatsFactory.totalTime($scope.album).then(function(timeResult) {
	    $scope.album.totalRunTime = timeResult.toString().split(".")[0]+' seconds';
	}).then(null, function(err) {
	    console.error(err);
	})
     }).catch(console.error.bind(console));

  // main toggle
  $scope.toggle = function (song) {
    if ($scope.isPlaying()) PlayerFactory.pause();
    else PlayerFactory.play(song, $scope);
  }
  $scope.getCurrentSong = function (){
    return PlayerFactory.currentSong;
  }

  $scope.isPlaying = function (){
    return PlayerFactory.playing;
  }



});
