app.factory('LoadFactory', function($q, $http) {
		var loadHelper = {};

		loadHelper.loadAllAlbums = function() {
				return $http.get('/api/albums')
						.then(function(resObj) {
								console.log(resObj);
								return resObj.data;
						});
		}


		return loadHelper;
});
