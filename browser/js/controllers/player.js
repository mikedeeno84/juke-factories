app.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory){

  // initialize audio player
  var audio = document.createElement('audio');
  audio.addEventListener('ended', function () {
    $scope.next();
  });
  audio.addEventListener('timeupdate', function () {
    $scope.progress = 100 * audio.currentTime / audio.duration;
    $scope.$digest();
  });

  // state variables
  $scope.currentSong;
  $scope.playing = false;

  // main toggle
  $scope.toggle = function (song) {
    if ($scope.playing) $rootScope.$broadcast('pause');
    else $rootScope.$broadcast('play', song);
  }

  // incoming events (from Album or toggle)
  $scope.$on('pause', pause);
  $scope.$on('play', play);

  // functionality
  function pause () {
	  PlayerFactory.pause($scope, audio);
  }
  function play(event, song) {
	  PlayerFactory.play(event, song, $scope, audio);
  }
  // outgoing events (to Album)
  $scope.next = function(){ PlayerFactory.next($rootScope) };
  $scope.prev = function(){ PlayerFactory.prev($rootScope) };

});
