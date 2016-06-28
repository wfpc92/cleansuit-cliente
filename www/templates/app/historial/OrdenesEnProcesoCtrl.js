var OrdenesEnProcesoCtrl =  function ($scope, HistorialOrdenFactory) {
	
	console.log("OrdenesEnProcesoCtrl")
	HistorialOrdenFactory
	.cargar() 
	.then(function() {
		console.log("OrdenesEnProcesoCtrl: ", HistorialOrdenFactory.getOrdenesEnProceso())
		$scope.ordenes = HistorialOrdenFactory.getOrdenesEnProceso();
	}, function(err) {
		console.log("OrdenesEnProcesoCtrl: ", err)
	})
	
};

app.controller('OrdenesEnProcesoCtrl', OrdenesEnProcesoCtrl);