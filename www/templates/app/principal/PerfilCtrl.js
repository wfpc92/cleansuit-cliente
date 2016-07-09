var PerfilCtrl = function($scope,
						UsuarioFactory,
						$ionicPopup,
						AUTH_EVENTS,
						$rootScope){
	var self = this;


	$scope.actualizar = function() {
		UsuarioFactory
		.actualizarPerfil($scope.usuario)
		.then(function(msg) {
			$rootScope.$broadcast(AUTH_EVENTS.perfilActualizado, {msg: msg});
		});
	};

	$scope.$on("$ionicView.afterEnter", function () {
		$scope.usuario = UsuarioFactory.getUsuario();
		//objeto para almacenar informacion de entrada
		$scope.formData = {
			mostrarCambiarContrasena: false,
			contrasenaModificada: false,
			formValido: false
		};

		$scope.$watchGroup([
			'usuario.nombre',
			'usuario.direccion',
			'usuario.telefono',
			'usuario.correo',
			], function(newV, oldV, scope){
				console.log("ws1: ", newV)
				if(newV[0] && newV[1] && newV[2]&& newV[3]){
					$scope.formData.formValido = true;
				}
				else {
					$scope.formData.formValido = false;	
				}
			});


		$scope.$watchGroup([
			'usuario.contrasena',
			'usuario.repetirContrasena'
			], function(newV, oldV, scope) {
				console.log($scope.formPerfil)
				console.log("ws2: ", newV)
				if(newV[0] && newV[1] && newV[0] == newV[1]){
					$scope.formData.formValido = true;
					$scope.formData.contrasenaModificada = true;
				}
				else {
					$scope.formData.formValido = false;	
				}
			});
	});

};

app.controller("PerfilCtrl", PerfilCtrl);
