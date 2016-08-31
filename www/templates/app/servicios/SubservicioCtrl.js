var SubservicioCtrl = function($scope,
							$stateParams,
							ServiciosFactory,
							$ionicHistory,
							$state) {

	console.log("SubservicioCtrl");
	
	$scope.aumentarSubservicio = function(subservicio){
		console.log("Agregar item de servicio al carrito desde SubservicioCtrl");
		$scope.carrito.agregar(subservicio, "SUBSERVICIO", 1);
		$scope.carrito.limpiar();
	};

	$scope.disminuirSubservicio = function(subservicio){
		console.log("Disminuir item de servicio del carrito desde SubservicioCtrl");
		$scope.carrito.disminuir(subservicio, "SUBSERVICIO", 1);
		$scope.carrito.limpiar();
	};	

	$scope.regresarCatalogo = function() {
		$state.go("app.servicios");
		$ionicHistory.clearHistory();
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		})
	};

	$scope.$on("$ionicView.beforeEnter", function() {
		var i = $stateParams.indexServicio;
		var j = $stateParams.indexSubservicio; 
		$scope.subservicio = ServiciosFactory.servicios[i].subservicios[j];
	});
};


app.controller('SubservicioCtrl', SubservicioCtrl);
