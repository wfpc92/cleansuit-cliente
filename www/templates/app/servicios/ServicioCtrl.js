app.controller('ServicioCtrl', function($scope, $stateParams, ServiciosFactory, CarritoFactory) {
	$scope.indexCategoria = $stateParams.indexCategoria;
	$scope.indexServicio = $stateParams.indexServicio;
	$scope.servicio = ServiciosFactory.categorias[$scope.indexCategoria].servicios[$scope.indexServicio]
	//$log.debug("index de categoria: "+$scope.indexCategoria+", index servicio: "+$scope.indexServicio);

	$scope.aumentarServicio = function(servicio){
		CarritoFactory.agregar(servicio, "SERVICIO", 1);
	};

	$scope.disminuirServicio = function(servicio){
		CarritoFactory.disminuir(servicio, "SERVICIO", 1);
	};
	$scope.carrito = CarritoFactory;	
})