var IngresarManualCtrl = function($scope,
								AuthService,
								$ionicPopup,
								$rootScope,
								AUTH_EVENTS) {

	console.log("IngresarManualCtrl");
	
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
			console.log("IngresarManualCtrl.ingresar()", msg)
			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess, {msg: msg});
		}, function(msg) {
			console.log("IngresarManualCtrl: err", msg);
			$rootScope.$broadcast(AUTH_EVENTS.loginFailed, {msg: msg});
		});
	};

	$scope.$watchGroup([
		'usuario.correo',
		'usuario.contrasena',
		], function(newV, oldV, scope){
			console.log("IngresarManualCtrl.watch", newV)
			$scope.formValido = newV;
	});
};

app.controller('IngresarManualCtrl', IngresarManualCtrl);
