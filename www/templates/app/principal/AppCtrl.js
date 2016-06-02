var AppCtrl = function($scope, UsuarioFactory, CarritoFactory, $state, HistorialOrdenFactory) {
	var self = this;

	$scope.usuario = UsuarioFactory.getUsuario();
	$scope.carrito = CarritoFactory;
	$scope.ordenesEnProceso = HistorialOrdenFactory.ordenesEnProceso;

	$scope.cerrarSesion = function() {
		$state.go("autenticacion.inicio");
		/*
		if(usuario.sesion){
			usuario.sesion.cerrarSesion();
			$state.go("autenticacion-inicio");
		}*/
	};
	
};

app.controller('AppCtrl', AppCtrl);
