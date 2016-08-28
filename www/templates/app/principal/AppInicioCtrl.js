var AppInicioCtrl = function($scope, 
							PromocionesFactory, 
							$ionicTabsDelegate, 
							ControlDescargasFactory,
							$log) {
	
	$ionicTabsDelegate.select(0);
	$log.debug("AppInicioCtrl");
	
	ControlDescargasFactory
	.cargaInicial()
	.finally(function() {
		//cuando termina de descargar las promociones
		$scope.promociones = PromocionesFactory.promociones;
		console.log("=============", PromocionesFactory.promociones)
	});

	$scope.$on("$ionicView.beforeEnter", function () {
		//si esta almacena anteriormente
		$scope.promociones = PromocionesFactory.promociones;
		$scope.banderas.swp=false;
		$scope.banderas.sws=false;
	});

	$scope.cargarPromociones = function() {
		console.log("AppInicioCtrl.cargarPromociones().");
		PromocionesFactory
		.cargar()
		.then(function() { 
			$scope.promociones = PromocionesFactory.promociones;
		});
	};
};

app.controller('AppInicioCtrl', AppInicioCtrl);
