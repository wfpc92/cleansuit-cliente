var OrdenesEnProceso =  function ($scope, HistorialOrdenFactory) {
	$scope.ordenes = HistorialOrdenFactory.ordenesEnProceso;
	
};

app.controller('OrdenesEnProcesoCtrl', OrdenesEnProceso);