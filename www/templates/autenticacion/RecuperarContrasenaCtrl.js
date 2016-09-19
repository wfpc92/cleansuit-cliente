var RecuperarContrasenaCtrl = function($scope,
									PopupFactory,
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
			PopupFactory
			.alert({
		    	title: 'Recuperar Contraseña',
		    	template: mensaje
		    })
		});
	};

	$scope.noHacerNada = function() {
		
	}
};

app.controller('RecuperarContrasenaCtrl', RecuperarContrasenaCtrl);
