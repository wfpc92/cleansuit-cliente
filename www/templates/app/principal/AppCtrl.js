app.controller('AppCtrl', function($scope, UsuarioFactory, CarritoFactory, HistorialOrdenFactory, $state) {
	$scope.usuario = UsuarioFactory.getUsuario();
	$scope.carrito = CarritoFactory;
	$scope.contOrdenesEnProceso = HistorialOrdenFactory.ordenesEnProceso.length;
	
	$scope.cerrarSesion = function() {
		$state.go("autenticacion-inicio");
		/*
		if(usuario.sesion){
			usuario.sesion.cerrarSesion();
			$state.go("autenticacion-inicio");
		}*/
	}
})