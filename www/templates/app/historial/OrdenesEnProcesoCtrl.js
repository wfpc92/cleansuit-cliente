var OrdenesEnProcesoCtrl =  function ($scope,
									$log,
									OrdenesFactory) {
	
	$log.debug("OrdenesEnProcesoCtrl")
			
	$scope.$on("$ionicView.beforeEnter", function () {
		OrdenesFactory.cargarOrdenesEnProceso();
		$scope.ordenes = OrdenesFactory.ordenesEnProceso;
	});

	$scope.hayOrdenes = function() {
		if(!$scope.ordenes) {
			return false;
		}

		if($scope.ordenes.length > 0) {
			return true;
		}
		
		return false;
	};
	
};

app.controller('OrdenesEnProcesoCtrl', OrdenesEnProcesoCtrl);