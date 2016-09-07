var OrdenesEnProcesoCtrl =  function ($scope,
									$log,
									OrdenesFactory) {
	
	$log.debug("OrdenesEnProcesoCtrl")
	$scope.ordenes = OrdenesFactory.ordenesEnProceso;

	OrdenesFactory
	.cargarOrdenesEnProceso() 
	.then(function() {
		//$scope.ordenes = OrdenesFactory.ordenesEnProceso;
	});

	$scope.hayOrdenes = function() {
		if(!$scope.ordenes) {
			return false;
		}

		if($scope.ordenes.length > 0) {
			return true;
		}
		
		return false;
	};
	
};

app.controller('OrdenesEnProcesoCtrl', OrdenesEnProcesoCtrl);