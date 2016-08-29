var HistorialOrdenCtrl = function ($scope, 
								$stateParams,
								OrdenesFactory) {
	console.log("HistorialOrdenCtrl");
	var indexOrden = $stateParams.indexOrden;
	$scope.orden = OrdenesFactory.historialOrdenes[indexOrden];
	$scope.orden.totales = $scope.carrito.calcularTotales($scope.orden);

	console.log("HistorialOrdenCtrl", $scope.orden)
	$scope.esOrdenEnProceso = false;
	$scope.soloProductos = $scope.carrito.soloHayProductos($scope.orden.items);
};

app.controller('HistorialOrdenCtrl', HistorialOrdenCtrl);
