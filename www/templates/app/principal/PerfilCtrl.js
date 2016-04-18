var PerfilCtrl = function($scope, UsuarioFactory, $ionicPopup){
	var self = this;

	$scope.usuario = UsuarioFactory.getUsuario();
	console.log($scope.usuario)

	$scope.guardarPerfil = function() {
		self.verificarInformacion($scope, function() {
			UsuarioFactory.guardarInformacion();
		});
	};

	$scope.cambiarContrasena = function() {
		var options = {
	    	templateUrl: 'templates/app/principal/popup-cambiar-contrasena.html',
		    title: 'Escriba su nueva Contraseña',
		    subTitle: 'Minimo 6 caracteres, con letras y números',
		    scope: $scope,
		    buttons: [
		    	{ text: 'Cancelar' },
				{
					text: '<b>Guardar</b>',
					type: 'button-positive',
					onTap: function(e) {
					  if (!$scope.usuario.contrasena && !$scope.usuario.confirmarContrasena) {
					    //don't allow the user to close unless he enters wifi password
					    e.preventDefault();
					  } else {
					    return $scope.usuario.password;
					  }
					}
				}
			]
	    };
		self.mostrarPopup($ionicPopup, options);
	}

};

PerfilCtrl.prototype.verificarInformacion = function($scope, cllbck){
	if(true){
		cllbck();
	}
}

PerfilCtrl.prototype.mostrarPopup = function($ionicPopup, optionsPopup, cllbck){
	$ionicPopup
		.show(optionsPopup)
		.then(function(res) {
			if(res) {
				cllbck();
			}
	});
}



app.controller("PerfilCtrl", PerfilCtrl);