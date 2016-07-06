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
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {msg: msg});
		}, function(msg) {
			console.log("IngresarManualCtrl: err", msg);
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed, {msg: msg});
		});
	};
};

app.controller('IngresarManualCtrl', IngresarManualCtrl);
