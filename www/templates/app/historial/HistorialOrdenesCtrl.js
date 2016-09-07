var HistorialOrdenesCtrl = function ($scope, 
									$log,
									OrdenesFactory) {
	
	$log.debug("HistorialOrdenesCtrl");
	
	$scope.ordenes = OrdenesFactory.historialOrdenes;

	OrdenesFactory
	.cargarHistorialOrdenes()
	.finally(function() {
		//$scope.ordenes = OrdenesFactory.historialOrdenes;
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

app.controller('HistorialOrdenesCtrl', HistorialOrdenesCtrl);
