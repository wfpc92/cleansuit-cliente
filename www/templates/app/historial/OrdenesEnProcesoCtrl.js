var OrdenesEnProcesoCtrl =  function ($scope,
									OrdenesFactory) {
	
	console.log("OrdenesEnProcesoCtrl")
	$scope.ordenes = OrdenesFactory.ordenesEnProceso;

	OrdenesFactory
	.cargarOrdenesEnProceso() 
	.then(function() {
		$scope.ordenes = OrdenesFactory.ordenesEnProceso;
	});
	
};

app.controller('OrdenesEnProcesoCtrl', OrdenesEnProcesoCtrl);