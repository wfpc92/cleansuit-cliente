var PerfilCtrl = function($scope,
						UsuarioFactory,
						$ionicPopup){
	var self = this;


	$scope.guardarPerfil = function() {
		UsuarioFactory
		.actualizarPerfil($scope.usuario)
		.then(function(mensaje) {
			$ionicPopup
			.alert({
				title: mensaje
			});
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
			'usuario.telefono'
			], function(newV, oldV, scope){
				if(newV[0] && newV[1] && newV[2]){
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
				console.log(newV)
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
