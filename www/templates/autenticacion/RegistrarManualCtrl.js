var RegistrarManualCtrl = function($scope,
								$ionicPopup,
								AuthService,
								$log,
								AUTH_EVENTS,
								$rootScope) {

	$log.debug("RegistrarManualCtrl");
	$scope.error = "";
	$scope.formValido = [];
	$scope.usuario = {
		nombre: "",
		correo: "",
		contrasena: ""
	};

	$scope.registrar = function() {
		console.log("registrar enter")
		if (!$scope.formValido[0]) {
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed, {msg: "Escriba su nombre."});
			return;
		}
		
		if (!$scope.formValido[1]) {
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed, {msg: "Escriba un córreo válido."});
			return;
		}

		if (!$scope.formValido[2]) {
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed, {msg: "La contraseña debe tener mínimo 6 caracteres."});
			return;
		}

		AuthService
		.registrar($scope.usuario)
		.then(function(msg) {
			$log.debug("RegistrarManualCtrl:", msg)
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess, { msg: msg });
		}, function(msg) {
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed, { msg: msg });
		});
	};

	$scope.$watchGroup([
		'usuario.nombre',
		'usuario.correo',
		'usuario.contrasena',
		], function(newV, oldV, scope){
			$log.debug("RegistrarManualCtrl.watch", newV);
			$scope.formValido = newV;
	});
};

app.controller('RegistrarManualCtrl', RegistrarManualCtrl);
