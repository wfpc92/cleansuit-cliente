var HistorialOrdenesCtrl = function ($scope, 
									OrdenesFactory) {
	
	console.log("HistorialOrdenesCtrl");
	
	$scope.ordenes = OrdenesFactory.historialOrdenes;

	OrdenesFactory
	.cargarHistorialOrdenes()
	.finally(function() {
		$scope.ordenes = OrdenesFactory.historialOrdenes;
	});
};

app.controller('HistorialOrdenesCtrl', HistorialOrdenesCtrl);
