var IngresarManualCtrl = function($scope,
								AuthService,
								$ionicPopup,
								UsuarioFactory,
								$rootScope,
								AUTH_EVENTS) {
	console.log("IngresarManualCtrl")
	$scope.error = "";
	$scope.user = {
		email: "",
		password: ""
	};

	$scope.login = function() {
		AuthService
		.login($scope.user)
		.then(function(msg) {
			console.log("IngresarManualCtrl.login()", msg)
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
			$scope.setCurrentUser(UsuarioFactory.getUsuario());
		}, function(errMsg) {
			console.log("IngresarManualCtrl: err", errMsg);
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
			var alertPopup = $ionicPopup.alert({
				title: 'Login failed!',
        		template: 'Please check your credentials!'
			});
		});
	};
};


app.controller('IngresarManualCtrl', IngresarManualCtrl);