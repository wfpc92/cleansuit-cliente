var RegistrarManualCtrl = function($scope, $ionicPopup, AuthService, $state) {
	$scope.error = "";
	$scope.user = {
		name: "",
		email: "",
		password: ""
	};

	$scope.signup = function() {
		AuthService.register($scope.user).then(function(msg) {
			$state.go('app.inicio');
			var alertPopup = $ionicPopup.alert({
				title: 'Registro exitoso!',
				template: msg
			});
		}, function(errMsg) {
			var alertPopup = $ionicPopup.alert({
				title: 'Registro Falló!',
				template: errMsg
			});
		});
	};
};

app.controller('RegistrarManualCtrl', RegistrarManualCtrl);