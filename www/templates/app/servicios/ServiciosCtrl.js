app.controller('ServiciosCtrl', function($scope, $stateParams, ServiciosFactory, CarritoFactory) {
	$scope.indexCategoria = $stateParams.indexCategoria;
	//$log.debug("index de la categoria en el arreglo: "+$scope.indexCategoria)
	
	//obtener subservicios de la categoria solicitada
	$scope.servicios = ServiciosFactory.categorias[$scope.indexCategoria].servicios;
	$scope.aumentarServicio = function(servicio){
		CarritoFactory.agregar(servicio, "SERVICIO", 1);
	};

	$scope.disminuirServicio = function(servicio){
		CarritoFactory.disminuir(servicio, "SERVICIO", 1);
	};
	$scope.carrito = CarritoFactory;
})