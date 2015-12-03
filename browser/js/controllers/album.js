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
  .then(res => $http.get('/api/albums/' + res.data[0]._id))
  .then(res => res.data)
  .then(album => {
    album.imageUrl = '/api/albums/' + album._id + '.image';
    album.songs.forEach(function(song){
      song.audioUrl = '/api/songs/' + song._id + '.audio';
    });
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
    if ($scope.playing) $rootScope.$broadcast('pause');
    else $rootScope.$broadcast('play', song);
  }

  // incoming events (from Player, toggle, or skip)
  $scope.$on('pause', pause);
  $scope.$on('play', play);
//  $scope.$on('next', next);
//  $scope.$on('prev', prev);

  // functionality
  function pause () {
	 PlayerFactory.pause($scope, audio);
  }
  function play (event, song){
	  PlayerFactory.play(event, song, $scope, audio);
  };

  // a "true" modulo that wraps negative to the top of the range
  function mod (num, m) { return ((num%m)+m)%m; };

  // jump `val` spots in album (negative to go back)
  /*
  function skip (val) {
    if (!$scope.currentSong) return;
    var idx = $scope.album.songs.indexOf($scope.currentSong);
    idx = mod( (idx + (val || 1)), $scope.album.songs.length );
    $rootScope.$broadcast('play', $scope.album.songs[idx]);
  };
  function next () { skip(1); };
  function prev () { skip(-1); };
  */

});
