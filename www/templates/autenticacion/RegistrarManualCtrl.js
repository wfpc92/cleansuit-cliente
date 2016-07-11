var RegistrarManualCtrl = function($scope,
								$ionicPopup,
								AuthService,
								AUTH_EVENTS,
								$rootScope) {

	console.log("RegistrarManualCtrl");
	$scope.error = "";
	$scope.formValido= false;
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

	$scope.$watchGroup([
		'usuario.nombre',
		'usuario.correo',
		'usuario.contrasena',
		], function(newV, oldV, scope){
			console.log(newV)
			if(newV[0] && newV[1] && newV[2]){
				$scope.formValido = true;
			}
			else {
				$scope.formValido = false;	
			}
	});

};

app.controller('RegistrarManualCtrl', RegistrarManualCtrl);
