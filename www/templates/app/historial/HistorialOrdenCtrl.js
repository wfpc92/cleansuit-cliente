app.controller('HistorialOrdenCtrl', function ($scope, $stateParams, HistorialOrdenFactory) {
	var idOrden = $stateParams.idOrden;
	$scope.ordenHistorica = HistorialOrdenFactory.getOrdenHistorica(idOrden);
})