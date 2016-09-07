var IngresarManualCtrl = function($scope,
								AuthService,
								$ionicPopup,
								$rootScope,
								$log,
								AUTH_EVENTS) {

	$log.debug("IngresarManualCtrl");
	
	$scope.error = "";
	$scope.formValido = [];
	$scope.usuario = {
		correo: "",
		contrasena: ""
	};

	$scope.ingresar = function() {
		if (!$scope.formValido[0]) {
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed, {msg: "Escriba un córreo válido."});
			return;
		}
		if (!$scope.formValido[1]) {
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed, {msg: "La contraseña debe tener mínimo 6 caracteres."});
			return;
		}

		AuthService
		.ingresar($scope.usuario)
		.then(function(msg) {
			$log.debug("IngresarManualCtrl.ingresar()", msg)
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {msg: msg});
		}, function(msg) {
			$log.debug("IngresarManualCtrl: err", msg);
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed, {msg: msg});
		});
	};

	$scope.$watchGroup([
		'usuario.correo',
		'usuario.contrasena',
		], function(newV, oldV, scope){
			$log.debug("IngresarManualCtrl.watch", newV)
			$scope.formValido = newV;
	});
};

app.controller('IngresarManualCtrl', IngresarManualCtrl);
