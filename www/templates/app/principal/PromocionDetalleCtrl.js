var PromocionDetalleCtrl = function($scope, 
							$stateParams,
							$log,
							PromocionesFactory, 
							$ionicHistory, 
							$state) {
	
	$log.debug("PromocionDetalleCtrl");
	var indexPromocion = $stateParams.indexPromocion;
	$scope.promocion = PromocionesFactory.promociones[indexPromocion];
		
	$scope.regresarCatalogo = function() {
		$ionicHistory.clearHistory();
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		});
		$state.go("app.inicio");
	};	
};

app.controller('PromocionDetalleCtrl', PromocionDetalleCtrl);
