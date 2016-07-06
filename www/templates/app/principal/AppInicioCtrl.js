var AppInicioCtrl = function($scope, 
							PromocionesFactory, 
							CarritoFactory, 
							$ionicTabsDelegate, 
							CargaInicialFactory) {
	
	$ionicTabsDelegate.select(0);
	
	$scope.promociones = PromocionesFactory.getPromociones();
	$scope.carrito = CarritoFactory; 

	CargaInicialFactory
	.iniciar(function() {
		console.log("termina de ejecutar la funcion iniciar de CargaInicialFactory")
	});
};

app.controller('AppInicioCtrl', AppInicioCtrl);
