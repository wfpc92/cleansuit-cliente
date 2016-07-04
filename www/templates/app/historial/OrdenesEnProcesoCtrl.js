var OrdenesEnProcesoCtrl =  function ($scope,
									OrdenesFactory) {
	
	console.log("OrdenesEnProcesoCtrl")
	OrdenesFactory
	.cargarOrdenesEnProceso() 
	.then(function() {
		console.log("OrdenesEnProcesoCtrl: ", OrdenesFactory.getOrdenesEnProceso())
		$scope.ordenes = OrdenesFactory.getOrdenesEnProceso();
	}, function(err) {
		console.log("OrdenesEnProcesoCtrl: ", err)
	})
	
};

app.controller('OrdenesEnProcesoCtrl', OrdenesEnProcesoCtrl);