app.controller('PlayerCtrl', function($scope, $rootScope, PlayerFactory){

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

  $scope.next = function(){ PlayerFactory.next() };
  $scope.prev = function(){ PlayerFactory.prev() };

});
