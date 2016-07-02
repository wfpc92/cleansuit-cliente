var PerfilCtrl = function($scope, UsuarioFactory, $ionicPopup){
	var self = this;

	$scope.usuario = UsuarioFactory.getUsuario();
	console.log(JSON.stringify($scope.usuario))

	$scope.guardarPerfil = function() {
		UsuarioFactory.guardarInformacion($scope.formData,  
			function() {
				$ionicPopup
					.alert({
						title: 'Tu perfil se ha actualizado.'
					});
				$scope.formData = {
					contrasena: '',
					confirmarContrasena: '',
					mostrarCambiarContrasena: false,
					contrasenaModificada: false,
					formValido: false
				};
		});
	};

	$scope.$on("$ionicView.afterEnter", function () {
		//objeto para almacenar informacion de entrada
		$scope.formData = {
			contrasena: '',
			confirmarContrasena: '',
			mostrarCambiarContrasena: false,
			contrasenaModificada: false,
			formValido: false
		};

		$scope.$watchGroup([
			'usuario.nombre',
			'usuario.apellidos',
			'usuario.direccion.departamento',
			'usuario.direccion.ciudad',
			'usuario.direccion.residencia',
			'usuario.telefono',
			'usuario.email'
			], function(newV, oldV, scope){
				if(newV[0] && newV[1] && newV[2] && newV[3] && newV[4] && newV[5] && newV[6]){
					$scope.formData.formValido = true;
				}
				else {
					$scope.formData.formValido = false;	
				}
			});


		$scope.$watchGroup([
				'formData.contrasena',
				'formData.confirmarContrasena'
			], function(newV, oldV, scope) {
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