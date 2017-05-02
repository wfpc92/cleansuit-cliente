var PerfilCtrl = function($scope,
						UsuarioFactory,
						$ionicPopup,
						AUTH_EVENTS,
						$rootScope, 
						$state,
						$log,
						$ionicHistory,
						FotosFactory){
	
	$log.debug("PerfilCtrl");

	$scope.subirFoto = function() {
		FotosFactory
		.seleccionarFoto()
		.then(function(imgData){
			if(imgData) {
				$scope.usuario.url_foto = "data:image/jpeg;base64," + imgData;
				$scope.formData.actualizaFoto = true;
				$log.debug("termina seleccion de foto.")
			}
		}, function(err) {
			//se cancela la seleccion de fotos.
			$log.debug("PerfilCtrl.subirFoto(), err", err)
		})
	};
	
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
		$scope.usuario.cedula = UsuarioFactory.getUsuario().cedula;
		$scope.usuario.direccion = UsuarioFactory.getUsuario().direccion;
		$scope.usuario.telefono = UsuarioFactory.getUsuario().telefono;
		$scope.usuario.correo = UsuarioFactory.getUsuario().correo;
		$scope.usuario.url_foto = UsuarioFactory.getUsuario().url_foto; 
		$scope.usuario.fb = UsuarioFactory.getUsuario().fb; 

		$scope.formData = {
			actualizaFoto: false,
			mostrarCambiarContrasena: false,
			contrasenaModificada: false,
			formValido: false
		};
	});

	$scope.noHacerNada = function() {
		
	}

};

app.controller("PerfilCtrl", PerfilCtrl);
