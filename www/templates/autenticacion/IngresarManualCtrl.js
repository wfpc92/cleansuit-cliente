var IngresarManualCtrl = function($scope, $state) {
	$scope.login = function() {
		console.log("haciendo login....")
		$state.go("app.inicio");
	}
};


app.controller('IngresarManualCtrl', IngresarManualCtrl);