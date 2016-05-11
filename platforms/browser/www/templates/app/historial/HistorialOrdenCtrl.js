var HistorialOrdenCtrl = function ($scope, $stateParams, HistorialOrdenFactory, CarritoFactory) {
	$scope.ordenHistorica = HistorialOrdenFactory.ordenes[$stateParams.indexOrden]; 
	$scope.soloProductos = CarritoFactory.soloHayProductos($scope.ordenHistorica.items);
};

app.controller('HistorialOrdenCtrl', HistorialOrdenCtrl);

