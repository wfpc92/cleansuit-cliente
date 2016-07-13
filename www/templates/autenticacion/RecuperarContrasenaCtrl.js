var RecuperarContrasenaCtrl = function($scope,
									$ionicPopup,
									RecursosFactory) {

	$scope.form = {};
	$scope.usuario = {};

	$scope.enviar = function() {
		
		RecursosFactory
		.post("/cliente/reset", $scope.usuario)
		.then(function(respuesta) {
			var mensaje = "";
			if(respuesta.data.success) {
				mensaje = 'Se ha enviado un enlace a tu correo.';
			} else {
				mensaje = respuesta.data.mensaje
			}
			$ionicPopup
			.alert({
		    	title: 'Recuperar Contraseña',
		    	template: mensaje
		    })
		}, function(err) {
			$ionicPopup
			.alert({
		    	title: 'Recuperar Contraseña',
		    	template: JSON.stringify(err)
		    })
		});


	};
};

app.controller('RecuperarContrasenaCtrl', RecuperarContrasenaCtrl);
