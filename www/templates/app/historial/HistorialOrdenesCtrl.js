var HistorialOrdenesCtrl = function ($scope, HistorialOrdenFactory) {
	HistorialOrdenFactory.obtenerHistorial(); 
	$scope.ordenes = HistorialOrdenFactory.historialOrdenes;
};

app.controller('HistorialOrdenesCtrl', HistorialOrdenesCtrl);
