var HistorialOrdenesCtrl = function ($scope, 
									$log,
									OrdenesFactory) {
	
	$log.debug("HistorialOrdenesCtrl");

	$scope.$on("$ionicView.beforeEnter", function () {
		OrdenesFactory.cargarHistorialOrdenes()
		$scope.ordenes = OrdenesFactory.historialOrdenes;
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
