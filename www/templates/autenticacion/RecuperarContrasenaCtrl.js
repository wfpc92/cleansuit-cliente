var RecuperarContrasenaCtrl = function($scope,
									PopupFactory,
									RecursosFactory) {

	$scope.form = {};
	$scope.usuario = {};

	$scope.enviar = function() {
		RecursosFactory
		.post("/cliente/reset", $scope.usuario)
		.then(function(respuesta) {
			PopupFactory
			.alert({
		    	title: 'Recuperar Contraseña',
		    	template: respuesta.data.mensaje
		    })
		});
	};

	$scope.noHacerNada = function() {
		//funcion no ejecuta nada, para moviles,
		//dar enter en teclado nativo invoca a submit.
	}
};

app.controller('RecuperarContrasenaCtrl', RecuperarContrasenaCtrl);
