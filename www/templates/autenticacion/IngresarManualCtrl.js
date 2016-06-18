var IngresarManualCtrl = function($scope, $state, AuthService, $ionicPopup) {
	$scope.error = "";
	$scope.user = {
		email: "",
		password: ""
	};

	$scope.login = function() {
		AuthService.login($scope.user).then(function(msg) {
			$state.go('app.inicio');
		}, function(errMsg) {
			var alertPopup = $ionicPopup.alert({
				title: 'Autenticación Falló!',
				template: errMsg
			});
		});
	};
};


app.controller('IngresarManualCtrl', IngresarManualCtrl);