var AppCtrl = function($scope, UsuarioFactory, CarritoFactory, HistorialOrdenFactory, $state) {
	var self = this;

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
	};

	console.log("hola");
	angular.element(document.querySelector('#menu-button')).addClass('hidden');
	console.log(document.getElementById('menu-button'))
	
};

app.controller('AppCtrl', AppCtrl);
