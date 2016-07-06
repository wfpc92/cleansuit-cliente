var RegistrarManualCtrl = function($scope,
								$ionicPopup,
								AuthService,
								AUTH_EVENTS,
								$rootScope) {

	console.log("RegistrarManualCtrl");
	$scope.error = "";
	$scope.usuario = {
		nombre: "",
		correo: "",
		contrasena: ""
	};

	$scope.registrar = function() {
		AuthService
		.registrar($scope.usuario)
		.then(function(msg) {
			console.log("RegistrarManualCtrl:", msg)
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess, { msg: msg });
		}, function(msg) {
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed, { msg: msg });
		});
	};
};

app.controller('RegistrarManualCtrl', RegistrarManualCtrl);
