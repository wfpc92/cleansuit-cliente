var HistorialOrdenesCtrl = function ($scope, HistorialOrdenFactory) {
	HistorialOrdenFactory.obtenerHistorial();  
	
	HistorialOrdenFactory
	.cargarHistorialOrdenes()
	.then(function() {
		$scope.ordenes = HistorialOrdenFactory.getHistorialOrdenes();
	});
};

app.controller('HistorialOrdenesCtrl', HistorialOrdenesCtrl);
