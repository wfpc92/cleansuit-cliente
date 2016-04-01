app.controller('OrdenesEnProcesoCtrl', function ($scope, HistorialOrdenFactory) {
	$scope.ordenes = HistorialOrdenFactory.ordenesEnProceso;
	
})