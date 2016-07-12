var SubserviciosCtrl = function($scope, 
							$stateParams,
							ServiciosFactory) {

	$scope.indexServicio = $stateParams.indexServicio;
	$scope.servicio = ServiciosFactory.getServicios()[$scope.indexServicio];
	 
	$scope.aumentarSubservicio = function(subservicio){
		console.log("Agregar item de subservicio al carrito desde SubserviciosCtrl");
		$scope.carrito.agregar(subservicio, "SUBSERVICIO", 1);
		$scope.carrito.limpiar();
	};

	$scope.disminuirSubservicio = function(subservicio){
		console.log("Disminuir item de servicio del carrito desde SubserviciosCtrl");
		$scope.carrito.disminuir(subservicio, "SERVICIO", 1);
		$scope.carrito.limpiar();
	};
};


app.controller("SubserviciosCtrl", SubserviciosCtrl);
