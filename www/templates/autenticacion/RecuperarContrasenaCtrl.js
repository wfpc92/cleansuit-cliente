var RecuperarContrasenaCtrl = function($scope, $ionicPopup) {

	$scope.enviar = function() {
		self.enviarCorreo($scope, function(){
			$ionicPopup
			.alert({
				title: 'Recuperar Contraseña',
				template: 'Se ha enviado un correo a tu bandeja de entrada para crear una nueva contraseña.'
			})
			.then(function(res){
				$scope.formData = {
					email: '',
					formValido: false
				};
			})
		})

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

app.controller('RecuperarContrasenaCtrl', RecuperarContrasenaCtrl);
