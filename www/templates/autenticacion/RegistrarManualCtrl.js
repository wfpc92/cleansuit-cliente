var RegistrarManualCtrl = function($scope,
								$ionicPopup,
								AuthService,
								$state,
								$rootScope,
								UsuarioFactory) {
	$scope.error = "";
	$scope.user = {
		name: "",
		email: "",
		password: ""
	};

	$scope.signup = function() {
		AuthService
		.register($scope.user)
		.then(function(msg) {
			console.log("RegistrarManualCtrl:", msg)
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			$scope.setCurrentUser(UsuarioFactory.getUsuario());
		}, function(errMsg) {
			var alertPopup = $ionicPopup.alert({
				title: 'Registro Falló!',
				template: JSON.stringify(errMsg)
			});
		});
	};
};

app.controller('RegistrarManualCtrl', RegistrarManualCtrl);