var IngresarManualCtrl = function($scope,
								AuthService,
								$ionicPopup,
								$rootScope,
								AUTH_EVENTS) {

	console.log("IngresarManualCtrl");
	
	$scope.error = "";
	$scope.usuario = {
		correo: "",
		contrasena: ""
	};

	$scope.ingresar = function() {
		AuthService
		.ingresar($scope.usuario)
		.then(function(msg) {
			console.log("IngresarManualCtrl.ingresar()", msg)
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
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