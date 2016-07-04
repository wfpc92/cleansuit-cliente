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
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
		}, function(res) {
			var alertPopup = $ionicPopup.alert({
				title: 'Registro Falló!',
				template: res
			});
		});
	};
};

app.controller('RegistrarManualCtrl', RegistrarManualCtrl);
