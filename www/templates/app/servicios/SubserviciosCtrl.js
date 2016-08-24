var SubserviciosCtrl = function($scope, 
							$stateParams,
							ServiciosFactory,
							TutorialFactory) {

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

	$scope.$on('$ionicView.afterEnter', function(event) {
		if ($scope.servicio.subservicios.length > 0) {
			TutorialFactory.mostrarTutorial($scope.tipo);
		}
	});

	$scope.tutorial = TutorialFactory;
	$scope.tipo = "SUBSERVICIOS";
	$scope.idLst = "lstSubservicios";
	TutorialFactory.setIdLst("#" + $scope.idLst);
};


app.controller("SubserviciosCtrl", SubserviciosCtrl);
