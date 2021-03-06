app.controller('loadMusic', function($scope, $http, StatsFactory, PlayerFactory, LoadFactory) {
	$scope.displayAlbums = function() {
		LoadFactory.loadAllAlbums()
			.then(function(albumArr) {
				albumArr.forEach(function(album) {
					album.imgUrl = '/api/albums/'+album._id+'.image';
				});
				console.log(albumArr);
				$scope.albumArr = albumArr;
			}).then(null, console.error);
	}
});
