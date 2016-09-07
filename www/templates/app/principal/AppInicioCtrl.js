var AppInicioCtrl = function($scope, 
							PromocionesFactory, 
							$ionicTabsDelegate, 
							ControlDescargasFactory,
							$log) {
	
	$ionicTabsDelegate.select(0);
	$log.debug("AppInicioCtrl");
	
	$scope.promociones = PromocionesFactory.promociones;

	ControlDescargasFactory
	.cargaInicial()
	.finally(function() {
		//cuando termina de descargar las promociones
		//$scope.promociones = PromocionesFactory.promociones;
		$log.debug("=============", PromocionesFactory.promociones)
	});

	$scope.$on("$ionicView.beforeEnter", function () {
		//si esta almacena anteriormente
		$scope.promociones = PromocionesFactory.promociones;
		$scope.banderas.swp=false;
		$scope.banderas.sws=false;
	});

	$scope.cargarPromociones = function() {
		$log.debug("AppInicioCtrl.cargarPromociones().");
		PromocionesFactory
		.cargar()
		.then(function() { 
			//$scope.promociones = PromocionesFactory.promociones;
		});
	};

	$scope.hayPromociones = function() {
		if(!$scope.promociones) {
			return false;
		}

		if($scope.promociones.length > 0) {
			return true;
		}
		
		return false;
	};
};

app.controller('AppInicioCtrl', AppInicioCtrl);
