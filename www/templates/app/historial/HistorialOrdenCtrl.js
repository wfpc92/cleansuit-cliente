var HistorialOrdenCtrl = function ($scope, 
								$stateParams,
								OrdenesFactory,
								$log) {
	$log.debug("HistorialOrdenCtrl");
	var indexOrden = $stateParams.indexOrden;
	$scope.orden = OrdenesFactory.historialOrdenes[indexOrden];
	$scope.orden.totales = $scope.carrito.calcularTotales($scope.orden);

	$log.debug("HistorialOrdenCtrl", $scope.orden)
	$scope.esOrdenEnProceso = false;
	$scope.soloProductos = $scope.carrito.soloHayProductos($scope.orden.items);
};

app.controller('HistorialOrdenCtrl', HistorialOrdenCtrl);
