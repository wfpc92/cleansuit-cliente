var PromocionDetalleCtrl = function($scope, 
							$stateParams, 
							PromocionesFactory, 
							$ionicHistory, 
							$state) {
	
	var indexPromocion = $stateParams.indexPromocion;
	$scope.promocion = PromocionesFactory.getPromociones()[indexPromocion];
		
	$scope.regresarCatalogo = function() {
		$ionicHistory.clearHistory();
		$ionicHistory.nextViewOptions({
			disableBack:'true'
		});
		$state.go("app.inicio");
	};	
};

app.controller('PromocionDetalleCtrl', PromocionDetalleCtrl);
