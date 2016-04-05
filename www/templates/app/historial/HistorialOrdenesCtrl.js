app.controller('HistorialOrdenesCtrl', function ($scope, HistorialOrdenFactory) {
	HistorialOrdenFactory.obtenerHistorial(); 
	$scope.ordenes = HistorialOrdenFactory.historialOrdenes;
})
