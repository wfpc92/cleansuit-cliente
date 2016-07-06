var HistorialOrdenCtrl = function ($scope, 
								$stateParams,
								HistorialOrdenFactory,
								CarritoFactory) {
	
	var indexOrden = $stateParams.indexOrden;
	$scope.orden = HistorialOrdenFactory.getHistorialOrdenes()[indexOrden];
	console.log("HistorialOrdenCtrl", $scope.orden)
	//$scope.soloProductos = CarritoFactory.soloHayProductos($scope.orden.items);
};

app.controller('HistorialOrdenCtrl', HistorialOrdenCtrl);
