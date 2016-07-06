var HistorialOrdenesCtrl = function ($scope, 
									OrdenesFactory) {
		
	OrdenesFactory
	.cargarHistorialOrdenes()
	.then(function() {
		$scope.ordenes = OrdenesFactory.getHistorialOrdenes();
	});
};

app.controller('HistorialOrdenesCtrl', HistorialOrdenesCtrl);
