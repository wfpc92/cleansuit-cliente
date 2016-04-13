var OrdenEnProcesoCtrl = function ($scope, $stateParams, HistorialOrdenFactory, EstadosFactory) {
	var idOrden = $stateParams.idOrden;
	$scope.orden = HistorialOrdenFactory.getOrdenEnProceso(idOrden);
	$scope.estados = EstadosFactory.estados;
};

app.controller('OrdenEnProcesoCtrl', OrdenEnProcesoCtrl);