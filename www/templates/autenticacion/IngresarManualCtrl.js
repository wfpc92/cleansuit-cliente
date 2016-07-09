var IngresarManualCtrl = function($scope,
								AuthService,
								$ionicPopup,
								$rootScope,
								AUTH_EVENTS) {

	console.log("IngresarManualCtrl");
	
	$scope.error = "";
	$scope.formValido= false;
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

	$scope.$watchGroup([
		'usuario.correo',
		'usuario.contrasena',
		], function(newV, oldV, scope){
			if(newV[0] && newV[1] ){
				$scope.formValido = true;
			}
			else {
				$scope.formValido = false;	
			}
	});
};

app.controller('IngresarManualCtrl', IngresarManualCtrl);
