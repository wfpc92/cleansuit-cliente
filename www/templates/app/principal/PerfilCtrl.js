var PerfilCtrl = function($scope,
						UsuarioFactory,
						$ionicPopup,
						AUTH_EVENTS,
						$rootScope, 
						$state,
						$ionicHistory,
						FotosFactory){
	
	console.log("PerfilCtrl");

	$scope.subirFoto = function() {
		FotosFactory
		.seleccionarFoto()
		.then(function(imgData){
			if(imgData) {
				$scope.usuario.url_foto = "data:image/jpeg;base64," + imgData;
				console.log("termina seleccion de foto.")
			}
		}, function(err) {
			//se cancela la seleccion de fotos.
			console.log("PerfilCtrl.subirFoto(), err", err)
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
		$scope.usuario.direccion = UsuarioFactory.getUsuario().direccion;
		$scope.usuario.telefono = UsuarioFactory.getUsuario().telefono;
		$scope.usuario.correo = UsuarioFactory.getUsuario().correo;
		$scope.usuario.url_foto = UsuarioFactory.getUsuario().url_foto; 
		$scope.usuario.fb = UsuarioFactory.getUsuario().fb; 

		$scope.formData = {
			mostrarCambiarContrasena: false,
			contrasenaModificada: false,
			formValido: false
		};
	});

};

app.controller("PerfilCtrl", PerfilCtrl);
