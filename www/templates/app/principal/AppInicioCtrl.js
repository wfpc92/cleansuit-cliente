var AppInicioCtrl = function($scope, 
							PromocionesFactory, 
							CarritoFactory, 
							$ionicTabsDelegate, 
							CargaInicialFactory,
							HistorialOrdenFactory) {
	
	$ionicTabsDelegate.select(0);
	
	$scope.promociones = PromocionesFactory.getPromociones();
	$scope.carrito = CarritoFactory; 

	CargaInicialFactory
	.iniciar(function() {
		console.log("termina de ejecutar la funcion iniciar de CargaInicialFactory")
	});
	
	HistorialOrdenFactory.cargar().then(function(){
		$scope.contOrdenesEnProceso = HistorialOrdenFactory.getOrdenesEnProceso().length; 
	});
};

app.controller('AppInicioCtrl', AppInicioCtrl);
