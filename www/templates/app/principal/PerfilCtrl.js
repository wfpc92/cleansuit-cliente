var PerfilCtrl = function($scope,
						UsuarioFactory,
						$ionicPopup,
						AUTH_EVENTS,
						$rootScope, $state,$ionicHistory){
	
	console.log("PerfilCtrlPerfilCtrlPerfilCtrlPerfilCtrl")
	$scope.actualizar = function() {
		UsuarioFactory
		.actualizarPerfil($scope.usuario)
		.then(function(msg) {
			$scope.usuario.contrasena = "";
			$scope.usuario.repetirContrasena = "";
			$rootScope.$broadcast(AUTH_EVENTS.perfilActualizado, {msg: msg});
			$state.go("app.perfil", {}, {reload:true});
		});
	};

	$scope.$on("$ionicView.beforeEnter", function () {
		$scope.usuario = {};
		$scope.usuario.nombre = UsuarioFactory.getUsuario().nombre;
		$scope.usuario.direccion = UsuarioFactory.getUsuario().direccion;
		$scope.usuario.telefono = UsuarioFactory.getUsuario().telefono;
		$scope.usuario.correo = UsuarioFactory.getUsuario().correo;
		$scope.formData = {
			mostrarCambiarContrasena: false,
			contrasenaModificada: false,
			formValido: false
		};
	});
	

	$scope.$on("$ionicView.afterEnter", function () {
		//objeto para almacenar informacion de entrada
		


		/*$scope.$watchGroup(['usuario.nombre', 'usuario.direccion', 'usuario.telefono', 'usuario.correo'],
			function(newV, oldV, scope){
				console.log("ws1: ", newV)
				console.log($scope.formularioPerfil)
				//$scope.formData.formValido = newV[0] && newV[1] && newV[2]&& newV[3];
			});


		$scope.$watchGroup(['usuario.contrasena', 'usuario.repetirContrasena'],
			function(newV, oldV, scope) {
				console.log("ws2: ", newV)
				if(newV[0] && newV[1] && newV[0] == newV[1]){
					$scope.formData.formValido = true;
					$scope.formData.contrasenaModificada = true;
				}
				else {
					$scope.formData.formValido = false;	
				}
			});*/
	});

};

app.controller("PerfilCtrl", PerfilCtrl);
